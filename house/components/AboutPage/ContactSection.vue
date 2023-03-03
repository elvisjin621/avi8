<template>
  <section-container
    :isActive="isActive"
    leftColor="#FEFEFE"
    rightColor="#FFFFFF"
    :isDark="false"
  >
    <div class="contact">
      <div class="contact-header">
        <div>
          <span v-for="(line, index) in headlines" :key="index">
            <span v-if="line" v-html="line"></span>
            <div v-else></div>
          </span>          
        </div>
      </div>
      <div class="contact-body">
        <div class="contact-description">
          <h1>{{heading}}</h1>
          <p>{{subHeadlines}}</p>
        </div>
        <div class="contact-form-container">
          <no-ssr>
          <contact-form></contact-form>
        </no-ssr>
        </div>
      </div>
      <ul v-if="links.length > 0" class="contact-nav">
        <li class="contact-nav-title">
          <span>Who we are</span>
          <div class="contact-nav-divider"></div>
        </li>
        <li class="contact-nav-link" v-for="(link, index) in links" :key="index">
          <a :href="`#${link.slug}`">{{ link.title }}</a>
        </li>
      </ul>
    </div>
  </section-container>
</template>

<script>
import ContactForm from "./ContactForm.vue";

export default {
  name: "ContactSection",
  components: { ContactForm },
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
    const subHeadlines = this.subHeadlines;
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
        this.$store.commit("layout/setLightBackground");
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
          ".contact-header > div > span",
          ".contact-form-container",
          ".contact-description > h1",
          ".contact-description > p",
          ".contact-nav-title",
          ".contact-nav-link",
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
        targets: ".contact-nav-divider",
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
.contact {
  z-index: $zIndexPageContent;
  width:100%;
  .contact-header {
    width: 70%;
    h1 {
      font-size: $fontSize9;
    }
    div {
      margin-bottom: $space-1;
    }
    span {
      will-change: opacity, transform;
      display: block;
      font-size: $fontSize3;
      font-weight: $fontWeightThin;
    }
  }

  .contact-body {
    background-image: url("../../assets/svg/Map.svg");
    background-repeat: no-repeat;
    background-position: right;
    background-size: auto calc(100vh - 250px);
    height: calc(100vh - 250px);    
    display: flex;
    align-items: center;
    .contact-description {
      width: 50%;
    }
    .contact-form-container {
      will-change: opacity, transform;
      width: 50%;
      height: calc(100vh - #{$space-3} * 3);
      overflow: hidden;
      .contact-form {
        width: 100%;
        height: 100%;
        background-color: $colorWhite;
      }
    }
    h1 {
      font-size: $fontSize14;
      padding: $space10-3;
      padding-left: 0;
      margin: 0;
    } 
    p {
      padding-left: 0;
      margin: 0;
      font-size: $fontSize3;
    }
    .email-input {
      padding: $space-1;
      margin-top: $space-2;
      margin-bottom: 39px;
      width: 100%;
      max-width: 400px;
      height: 56px;
      background: #E6E6E6;
      font-size: $fontSize3;
      color: #000000;
      border: 1px solid #000000;
      box-sizing: border-box;
      border-radius: 12px;
    }
    .email-button {
      width: 200px;
      height: 48px;
      line-height: 48px;
      background: #FFC700;
      border-radius: 36px;
      font-weight: bold;
      font-size: $fontSize3;
      text-align: center;
      text-transform: uppercase;
      color: #000000;
    }
  }
  .contact-subheader {
    font-size: $fontSize13;
  }

  .contact-nav {
    display: flex;
    font-size: $fontSize10;
    margin-right: -150px;
    padding: $space-2;
    padding-left:0px;
    padding-right:0px;
    li {
      margin-right: $space10-2;
      a {
        color:#000000;
        opacity: 1;    
        transition: 0.5s opacity;
        &:hover {
          opacity: 1 !important;
        }
      }
    }
    .contact-nav-title {
      will-change: opacity, transform;
      display: flex;
      align-items: center;
      span {
        margin-right: $space-1;
        opacity: 1;
      }
      .contact-nav-divider {
        flex: 1;
        width: 0;
        height: 1px;
        opacity: 0.5;
        display: inline-block;
        background-color: $colorBlack;
        vertical-align: middle;
      }
    }
    .contact-nav-link {
      will-change: opacity, transform;
      pointer-events: auto;
      letter-spacing: 3px;
      text-transform: uppercase;
      font-weight: $fontWeightBold;
    }
  }
}

@media #{$tablet} {
  .contact {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 $space-3;
    padding: $space-3;
    max-width: 100%;
    .contact-header {
      max-width: unset;
      font-size: $fontSize5;
    }
    .contact-nav {
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
  .contact {
    margin: 0 $space-2;
    padding: $space-1;
    .contact-header {
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
