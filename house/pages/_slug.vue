<template>
  <simple-page-template>
    <div class="partner-container">
      <hero-image :image="partner.imageSrc"></hero-image>
      <div class="partner-content-container">
        <div class="partner-summary">
          <div class="partner-summary-logo">
            <img v-if="partner.logo" :src="partner.logo" :alt="partner.title" />
            <h1>{{ partner.title }}</h1>
          </div>
          <div class="partner-summary-content">{{ partner.description }}</div>
        </div>
        <div
          class="partner-summary-meta"
          v-if="partner.partnerLogos.length > 0"
        >
          <div class="partner-summary-meta-name">Primary partners</div>
          <div class="partner-summary-meta-logos">
            <img
              v-for="(logo, i) in partner.partnerLogos"
              :key="i"
              :src="logo.imageSrc"
              :alt="logo.title"
            />
          </div>
        </div>
        <div
          class="partner-feature"
          v-for="(feature, i) in partner.features"
          :key="i"
        >
          <div class="partner-feature-content">
            <div class="partner-feature-heading">
              <div class="partner-feature-heading-title" v-if="feature.title">
                {{ feature.title }}
              </div>
              <div class="partner-feature-heading-divider"></div>
            </div>
            <div
              class="partner-feature-description"
              v-html="feature.description"
            />
            <div v-if="feature.cta" class="cta">
              <membership-link />
              <book-now />
            </div>
          </div>
          <div class="partner-feature-image">
            <a v-if="feature.url" :href="feature.url" target="_blank">
              <img
                :src="feature.imageSrc"
                :alt="`${partner.title} feature ${i + 1}`"
              />
            </a>
            <img
              v-else
              :src="feature.imageSrc"
              :alt="`${partner.title} feature ${i + 1}`"
            />
          </div>
        </div>
        <div class="partners-other">
          <h3>Other partners</h3>
          <ul class="partners-nav">
            <li class="partners-nav-divider">
              <div></div>
            </li>
            <li
              class="partners-nav-link"
              v-for="(link, index) in partnerLinks"
              :key="index"
            >
              <nuxt-link :to="`/${link.slug}`">{{ link.title }}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </simple-page-template>
</template>

<script>
import SimplePageTemplate from "../components/Layout/SimplePageTemplate.vue";
import HeroImage from "../components/Layout/HeroImage.vue";
import { isEmpty } from "lodash";

export default {
  components: {
    SimplePageTemplate,
    HeroImage,
  },
  async asyncData({ params, error, $axios }) {
    let category = await $axios.$get(`categories?slug=${params.slug}`);
    let category_id = category[0].id;
    let posts = await $axios.$get(`posts?categories=${category_id}&_embed`); 
    let postData = [];
    posts.map((data)=> {
      let imageSrc = '';

      let featuredMedia = data?._embedded? data._embedded : '';
      if ( featuredMedia ) {
        if (!isEmpty(featuredMedia['wp:featuredmedia']) && featuredMedia['wp:featuredmedia'].length) {
          imageSrc = featuredMedia['wp:featuredmedia'][0];
          imageSrc = imageSrc?.source_url ? imageSrc.source_url : '';
        }
      }
      postData.push({
        title: '',
        description: data.content.rendered,
        imageSrc: imageSrc,
        cta: data.acf.cta,
        url: data.acf.url,
      });
    });

    let partner =
     {
      slug: category[0].slug,
      title: category[0].name,
      logo: category[0].acf.logo.url,
      description: category[0].description,
      imageSrc: category[0].acf.image_src.url,
      partnerLogos: [],
      features: postData,
    };

    if (!partner) {
      error({
        statusCode: 404,
        message: "Partner not found",
      });
    }

    const partnerLinks = Object.keys(partner)
      .filter((key) => key !== params.slug)
      .map((key) => {
        return { slug: partner[key].slug, title: partner[key].title };
      });

    return { partner, partnerLinks };
  },
  head() {
    return {
      title: `Avi8ted House | ${this.partner.title}`,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.commit("layout/setLightBackground");
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.$anime({
      targets: ".page-content",
      opacity: 0,
      duration: 500,
      easing: "easeOutQuart",
    });
    setTimeout(() => {
      next();
    }, 500);
  },
  beforeRouteLeave(to, from, next) {
    this.$anime({
      targets: ".page-content",
      opacity: 0,
      duration: 500,
      easing: "easeOutQuart",
    });
    setTimeout(() => {
      next();
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";
.partner-container {
  z-index: $zIndexPageContent;
  position: relative;
  height: 100%;
  width: 100%;
  padding: $space-4;
  .partner-content-container {
    .partner-summary {
      z-index: $zIndexPageContent;
      position: relative;
      margin-top: $space-3;
      display: flex;
      .partner-summary-logo {
        width: 50%;
        padding: 0 $space-3;
        max-width: 100%;
        height: 150px;
        display: flex;
        align-items: center;
        margin-bottom: $space-1;
        img {
          display: block;
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }
        h1 {
          font-size: $fontSize11;
        }
      }
      .partner-summary-content {
        z-index: $zIndexPageContent;
        width: 50%;
        display: flex;
        text-align: right;
        align-items: center;
        font-size: $fontSize2;
        line-height: 1.8;
      }
    }
    .partner-summary-meta {
      display: flex;
      flex-direction: column;
      margin-bottom: $space-1;
      color: $colorGray;
      font-weight: $fontWeightSemiBold;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      .partner-summary-meta-name {
        flex: 0;
        white-space: nowrap;
      }
      .partner-summary-meta-logos {
        height: 150px;
        width: 100%;
        display: flex;
        img {
          display: block;
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }
      }
    }
    .partner-feature:nth-of-type(2n + 1) {
      flex-direction: row-reverse;
      .partner-feature-content {
        .partner-feature-heading {
          flex-direction: row;
          .partner-feature-heading-title {
            text-align: left;
          }
        }
        .partner-feature-description {
          padding-left: 0;
          padding-right: $space-2;
          text-align: left;
        }
      }
    }
    .partner-feature {
      z-index: $zIndexPageContent;
      position: relative;
      width: 100%;
      margin-bottom: $space-3;
      display: flex;
      .partner-feature-content {
        width: calc(100% / 3);
        padding: 0 $space-3;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .partner-feature-heading {
          margin: $space-2 0;
          color: $colorGray;
          font-weight: $fontWeightSemiBold;
          font-size: $fontSize1;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          display: flex;
          flex-direction: row-reverse;
          .partner-feature-heading-title {
            max-width: 106px;
            width: 100%;
            text-align: right;
          }
          .partner-feature-heading-divider {
            height: 1px;
            flex: 1;
            margin: calc(#{$space-1} / 2) 0;
            background-color: $colorGray;
          }
        }
        .partner-feature-description {
          padding-right: 0;
          padding-left: $space-2;
          font-size: $fontSize2;
          line-height: 1.8;
          text-align: right;
        }
        .cta {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: $space-2;
          & > * {
            margin-bottom: $space-2;
          }
        }
      }
      .partner-feature-image {
        width: calc(100% / 3 * 2);
        img {
          display: block;
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
    .partners-other {
      z-index: $zIndexPageContent;
      position: relative;
      padding: 0 $space-3;
      .partners-nav {
        display: flex;
        font-size: $fontSize2;
        li {
          margin-right: $space-2;
          a {
            transition: 0.5s opacity;
            opacity: 0.5;
            &:hover {
              opacity: 1 !important;
            }
          }
        }
        .partners-nav-divider {
          width: 100px;
          div {
            width: 100%;
            height: 1px;
            opacity: 0.5;
            display: inline-block;
            background-color: $colorWhite;
            vertical-align: middle;
          }
        }
        .partners-nav-link {
          pointer-events: auto;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: $fontWeightBold;
        }
      }
    }
  }
}

@media #{$tablet} {
  .partner-container {
    padding: 0;
    .partner-content-container {
      padding: 0 $space-3;
      .partner-summary {
        margin: $space-2 0;
        padding: 0 $space-2;
        flex-direction: column;
        .partner-summary-logo {
          width: 100%;
          padding: 0;
          height: 90px;
        }
        .partner-summary-details {
          width: 100%;
          padding: 0;
          margin-bottom: $space-1;

          .partner-summary-meta {
            .partner-summary-meta-name {
              white-space: normal;
            }
          }
        }
        .partner-summary-content {
          width: 100%;
          text-align: left;
        }
      }
      .partner-feature {
        padding: 0 $space-2;
        flex-direction: column;
        .partner-feature-content {
          width: 100%;
          padding: 0;
          margin-bottom: $space-2;
          .partner-feature-heading {
            flex-direction: row;
            .partner-feature-heading-title {
              text-align: left;
            }
          }
          .partner-feature-description {
            padding-left: 0;
            padding-right: $space-2;
            text-align: left;
          }
        }
        .partner-feature-image {
          width: 100%;
        }
      }
      .partner-feature:nth-of-type(2n + 1) {
        flex-direction: column;
        .partner-feature-content {
          width: 100%;
          padding: 0;
          .partner-feature-heading {
            flex-direction: row;
            .partner-feature-heading-title {
              text-align: left;
            }
          }
          .partner-feature-description {
            padding-left: 0;
            padding-right: $space-2;
            text-align: left;
          }
        }
      }
      .partners-other {
        padding: 0 $space-3;
        h3 {
          margin-bottom: $space-1;
        }
        .partners-nav {
          display: flex;
          flex-direction: column;
          li {
            margin-bottom: $space-1;
            margin-right: 0;
          }
          .partners-nav-divider {
            div {
              margin: 0;
            }
          }
        }
      }
    }
  }
}

@media #{$mobile} {
  .partner-container {
    .partner-content-container {
      padding: 0 $space-2;
      .partner-summary {
        margin: $space-2 0 $space-3;
        padding: 0 $space-2;
      }
      .partners-other {
        padding: 0 $space-2;
        margin-bottom: $space-2;
      }
    }
  }
}
</style>
