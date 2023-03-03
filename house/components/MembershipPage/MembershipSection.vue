<template>
  <section-container
    :isActive="isActive"
    class="membership"
    leftColor="#FEFEFE"
    rightColor="#FFFFFF"
    :isDark="false"
  >
    <div class="membership-container">
      <div class="membership-content">
        <div class="membership-card">
          <h2 class="membership-title">{{ title }}</h2>
        </div>
        <div class="membership-table">
          <div
            class="membership-column"
            v-for="membership in memberships"
            :key="membership.title"
          >
            <div class="membership-column-header">
              <h4 class="membership-column-header-title">
                {{ membership.title }}
              </h4>
              <h4 class="membership-column-header-price">
                {{ membership.price }}
              </h4>
            </div>
            <div class="membership-column-content" v-html="membership.features">
            </div>
          </div>
        </div>
        <div class="membership-contact">
          <nuxt-link to="/about#contact"
            ><div class="contact-button">Contact Us</div></nuxt-link
          >
        </div>
      </div>
    </div>
    <no-ssr>
      <particles-background></particles-background>
    </no-ssr>
  </section-container>
</template>

<script>
export default {
  name: "MembershipSection",
  props: {
    title: String,
    anchor: String,
    memberships: Array,
  },
  data() {
    return {
      isActive: true,
    };
  },
  computed: {
    inAnchor() {
      return this.$store.state.fullpage.inAnchor;
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
          `.membership .membership-title, .membership .membership-content .membership-column, .membership .membership-content .contact-button`,
        ],
        translateX: -100,
        opacity: 0,
        direction: "reverse",
        duration: 500,
        easing: "easeInQuart",
        endDelay: function(el, i, l) {
          return i * 50 + 500;
        },
        delay: function(el, i, l) {
          return (l - i) * 50 + 500;
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";
.membership-container {
  z-index: $zIndexPageContent;
  width: 100%;
  display: flex;
  .membership-content {
    height: calc(100vh - #{$space-3} * 2);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .membership-contact {
      margin-top: $space-2;
      .contact-button {
        padding: $space-1;
        font-size: $fontSize2;
        font-weight: $fontWeightSemiBold;
        text-transform: uppercase;
        background: $colorGold;
        color: $colorBlack;
      }
    }
    .membership-card {
      .membership-title {
        will-change: opacity, transform;
        font-size: $fontSize6;
      }
    }
    .membership-table {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .membership-column {
        flex: 1 0 25%;
        padding-bottom: $space-1;
        padding-left: $space-1;
        display: flex;
        flex-direction: column;
        min-width: 290px;
        .membership-column-header {
          background: $colorGold;
          padding: $space-1;
          color: $colorBlack;
          h3,
          h4 {
            margin: 0;
          }
          .membership-column-header-title {
            font-size: $fontSize8;
            margin-bottom: $space-1;
            white-space: nowrap;
          }
        }
        .membership-column-content {
          padding: $space-1;
          font-size: $fontSize2;
          border: 1px solid $colorGold;
          flex: 1;
          ul {
            list-style-type: disc;
            margin-left: $space-1;
          }
        }
      }
    }
  }
  .membership-form-container {
    will-change: opacity, transform;
    width: 50%;
    height: calc(100vh - #{$space-3} * 2);
    overflow: hidden;
    .membership-form {
      width: 100%;
      height: 100%;
      background-color: $colorWhite;
    }
  }
}

@media #{$tablet} {
  .membership-container {
    height: 100%;
    flex-wrap: wrap;
    padding: $space-3;
    .membership-content {
      width: 100%;
      height: auto;
      margin: $space-1;
      justify-content: flex-start;
      .membership-card {
        max-width: unset;
        .membership-title {
          font-size: $fontSize5;
        }
      }
    }
    .membership-form-container {
      width: 100%;
      height: auto;
      margin: $space-1;
    }
  }
}

@media #{$mobile} {
  .membership-container {
    padding: $space-2;
    .membership-content {
      .membership-card {
        max-width: unset;
        .membership-title {
          font-size: $fontSize4;
        }
      }
    }
  }
}
</style>
