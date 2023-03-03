<template>
  <section-container
    :isActive="isActive"
    leftColor="#FEFEFE"
    rightColor="#FFFFFF"
    :isDark="false"
  >
    <div class="home">
      <div class="home-header">
        <div>
          <h1>{{ heading }}</h1>
          <span v-html="subHeadlines">
          </span>
        </div>
        <div>
          <span v-for="(line, index) in headlines" :key="index">
            <span v-if="line" v-html="line"></span>
            <div v-else></div>
          </span>
        </div>
      </div>
      <ul v-if="links.length > 0" class="home-nav">
        <li class="home-nav-title">
          <span>Who we are</span>
          <div class="home-nav-divider"></div>
        </li>
        <li class="home-nav-link" v-for="(link, index) in links" :key="index">
          <a :href="`#${link.slug}`">{{ link.title }}</a>
        </li>
      </ul>
    </div>
    <no-ssr>
      <particles-background color="#fec010"></particles-background>
    </no-ssr>
  </section-container>
</template>

<script>
export default {
  name: "HomeSection",
  props: {
    heading: String,
    headlines: Array,
    subHeadlines: String,
    links: {
      type: Array,
      default: () => [],
    },
    anchor: String,
  },
  data() {
    
    const title = this.heading;
    const subtitle = this.subHeadlines;
    
    return {
      isActive: true,
      title,
      subtitle,
    };
  },
  computed: {
    inAnchor() {
      return this.$store.state.fullpage.inAnchor;
    },
    outAnchor() {
      return this.$store.state.fullpage.outAnchor;
    },
  },
  watch: {
    inAnchor(newValue, oldValue) {
      if (newValue === this.anchor) {
        this.$store.commit("layout/setLightkBackground");
        this.animateIn();
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    },
  },
  mounted() {
    this.$store.commit("layout/setLightBackground");
    this.animateIn();
  },
  methods: {
    animateIn() {
      this.$anime({
        targets: [
          ".home-header > div > h1",
          ".home-header > div > span",
          ".home-nav-title",
          ".home-nav-link",
        ],
        translateX: -100,
        opacity: 0,
        direction: "reverse",
        duration: 500,
        easing: "easeInQuart",
        delay: function(el, i, l) {
          return (l - i) * 50 + 500;
        },
        endDelay: function(el, i, l) {
          return i * 50 + 500;
        },
      });
      this.$anime({
        targets: ".home-nav-divider",
        width: "100%",
        duration: 1000,
        delay: 500,
        easing: "easeOutQuart",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";
.home {
  z-index: $zIndexPageContent;
  .home-header {
    margin-bottom: $space-2;
    h1 {
      margin: 0;
      font-size: $fontSize9;
    }
    div {
      margin-bottom: $space-1;
    }
    span {
      will-change: opacity, transform;
      display: block;
      font-size: $fontSize15;
      font-weight: $fontWeightThin;
    }
  }

  .home-nav {
    display: flex;
    font-size: $fontSize10;
    margin-top: 15vh;
    margin-right: -150px;
    li {
      margin-right: $space-1;
      a {
        color: $colorBlack;
        opacity: 1;    
        transition: 0.5s opacity;
        &:hover {
          opacity: 1 !important;
        }
      }
    }
    .home-nav-title {
      will-change: opacity, transform;
      display: flex;
      align-items: center;
      min-width: 165px;
      span {
        margin-right: $space-1;
        opacity: 1;
      }
      .home-nav-divider {
        flex: 1;
        width: 0;
        height: 1px;
        opacity: 1;
        display: inline-block;
        background-color: $colorBlack;
        vertical-align: middle;
      }
    }
    .home-nav-link {
      will-change: opacity, transform;
      pointer-events: auto;
      letter-spacing: 3px;
      text-transform: uppercase;
      font-weight: $fontWeightBold;
    }
  }
}

@media #{$tablet} {
  .home {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 $space-3;
    padding: $space-3;
    max-width: 100%;
    .home-header {
      max-width: unset;
      font-size: $fontSize5;
    }
    .home-nav {
      flex-direction: column;
      li {
        width: 100%;
        margin-right: 0;
        margin-bottom: calc(#{$space-1} / 2);
      }
    }
  }
}

@media #{$mobile} {
  .home {
    margin: 0 $space-2;
    padding: $space-1;
    .home-header {
      font-size: $fontSize3;
      h1 {
        font-size: $fontSize6;
      }
      span {
        font-size: $fontSize3;
      }
    }
  }
}
</style>
