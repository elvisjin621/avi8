<template>
  <footer class="footer">
    <menu-columns
      :isAnimated="isFooterVisible"
      :close="hideFooter"
      anchor="foot"
    ></menu-columns>
    <div class="footer-bottom">
      <div class="footer-bottom-column">
        <link-home
          @click.native="hideFooter"
          class="footer-logo"
          anchor="#home"
        >
          <img
            src="../../assets/svg/Logo.svg"
            width="120px"
            height="100px"
            alt="Avi8ted House"
          />
        </link-home>
      </div>
      <div class="footer-bottom-column">
        <div class="footer-bottom-column-text">
          <nuxt-link
            to="/privacy-policy"
            @click.native="hideFooter"
            v-if="false"
          >
            <span>Privacy policy</span>
          </nuxt-link>
        </div>
      </div>
      <div class="footer-bottom-column">
        <div class="footer-bottom-column-text">
          <span>Avi8ted House 2021 © All Rights Reserved</span>
        </div>
      </div>
      <div class="creators">
        <span>Created by</span>
        <a target="_blank" href="https://fuel-impact.com">
          <img src="../../assets/images/fuel_black.png" alt="Fuel Impact" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import MenuColumns from "./MenuColumns.vue";

export default {
  name: "FooterSection",
  components: { MenuColumns },
  computed: {
    isFooterVisible() {
      return this.$store.state.layout.isFooterVisible;
    },
  },
  watch: {
    isFooterVisible(newValue, oldValue) {
      if (newValue) {
        this.animateIn();
      } else {
        this.animateOut();
      }
    },
  },
  mounted() {
    this.$store.commit("layout/setLightBackground");
  },
  methods: {
    hideFooter() {
      if (this.$mq === "desktop") {
        this.$store.commit("layout/hideFooter");
      }
    },
    animateIn() {
      this.$anime({
        targets: [".footer .footer-bottom-column", ".creators"],
        translateX: 0,
        opacity: 1,
        duration: 0,
      });
      this.$anime({
        targets: [".footer .footer-bottom-column", ".creators"],
        translateX: -100,
        opacity: 0,
        duration: 1000,
        direction: "reverse",
        easing: "easeInQuart",
        delay: function (el, i, l) {
          return (l - i) * 25 + 750;
        },
        endDelay: function (el, i, l) {
          return i * 25 + 750;
        },
      });
    },
    animateOut() {
      const bottomColumnTextItems = [].slice
        .call(document.querySelectorAll(".footer .footer-bottom-column"))
        .reverse();

      this.$anime({
        targets: [bottomColumnTextItems, ".creators"],
        translateX: -100,
        opacity: 0,
        duration: 500,
        easing: "easeOutQuart",
        delay: function (el, i, l) {
          return i * 25;
        },
        endDelay: function (el, i, l) {
          return (l - i) * 25;
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";
.footer {
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100%;
  padding: $space-3;
  display: grid;
  grid-template-rows: auto min-content;
  row-gap: $space-3;
  background-color: $colorWhite;
  .menu-columns {
    z-index: $zIndexFooterText;
  }
  .footer-bottom {
    margin: 0 $space-4;
    z-index: $zIndexFooterText;
    display: grid;
    grid-template-rows: min-content min-content;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: end;
    .footer-bottom-column {
      will-change: opacity, transform;
      .footer-logo {
        path {
          fill: $colorWhite;
        }
      }
      .footer-bottom-column-text {
        color: $colorBlack;
        font-weight: $fontWeightSemiBold;
        a {
          color: $colorBlack;
        }
        span {
          opacity: 0.47;
        }
      }
    }
    .footer-bottom-column:nth-of-type(3n) {
      text-align: right;
    }
    .creators {
      margin-top: $space10-1;
      grid-column: 3/4;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      height: 20px;
      span {
        display: block;
        line-height: 1;
      }
      a {
        display: block;
        height: 100%;
        img {
          margin-left: $space-05;
          display: block;
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }
      }
    }
  }
}

@media #{$tablet} {
  .footer {
    min-height: 100vh;
    height: 100%;
    padding: $space-4 $space-3 $space-3;
    align-items: start;
    background-position: 95% 60%;
    .footer-bottom {
      margin: 0;
    }
  }
}

@media #{$mobile} {
  .footer {
    padding: $space-2;
    background-image: none;
    .footer-bottom {
      display: grid;
      grid-template-rows: min-content;
      grid-template-columns: auto;
      .footer-bottom-column:nth-of-type(3n) {
        text-align: left;
      }
      .footer-logo {
        display: none;
      }
      .creators {
        grid-column: auto;
        justify-content: flex-start;
      }
    }
  }
}
</style>
