<template>
  <div :class="['menu-columns', anchor]">
    <div class="menu-column first-column">
      <div class="menu-column-title">
        <span>Sitemap</span>
      </div>
      <ul class="menu-column-links">
        <li>
          <link-home @click.native="close" anchor="#home">Home</link-home>
        </li>
        <li>
          <nuxt-link @click.native="close" to="/think-tank"
            >Think-Tank/Incubator</nuxt-link
          >
        </li>
        <li>
          <nuxt-link @click.native="close" to="/lodging"
            >Lodging/Co-Living</nuxt-link
          >
        </li>
        <li>
          <nuxt-link @click.native="close" to="/about">About Us</nuxt-link>
        </li>
        <li>
          <nuxt-link @click.native="close" to="/memberships"
            >Memberships</nuxt-link
          >
        </li>
      </ul>
    </div>
    <div class="menu-column second-column">
      <div class="menu-column-title">
        <span>Headquarters</span>
      </div>
      <ul class="menu-column-address">
        <li>Washington, D.C.</li>
      </ul>
    </div>
    <div class="menu-column third-column">
      <div class="menu-column-title">
        <span>Social</span>
      </div>
      <ul class="menu-column-links">
        <li>
          <a href="https://www.facebook.com/Avi8tedThoughts/" target="_blank"
            >Facebook</a
          >
        </li>
        <li>
          <a href="https://www.instagram.com/avi8tedthoughts/" target="_blank"
            >Instagram</a
          >
        </li>
        <li>
          <a href="https://twitter.com/avi8tedthoughts" target="_blank"
            >Twitter</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuColumns",
  props: {
    isAnimated: {
      type: Boolean,
      default: false,
    },
    close: Function,
    anchor: String,
  },
  watch: {
    isAnimated(newValue, oldValue) {
      if (newValue) {
        this.animateIn();
      } else {
        this.animateOut();
      }
    },
  },
  methods: {
    animateIn() {
      this.$anime({
        targets: [
          `.menu-columns.${this.anchor} .first-column .menu-column-title`,
          `.menu-columns.${this.anchor} .first-column li`,
          `.menu-columns.${this.anchor} .second-column .menu-column-title`,
          `.menu-columns.${this.anchor} .second-column li`,
          `.menu-columns.${this.anchor} .third-column .menu-column-title`,
          `.menu-columns.${this.anchor} .third-column li`,
        ],
        translateX: 0,
        opacity: 1,
        duration: 0,
      });
      this.$anime({
        targets: [
          `.menu-columns.${this.anchor} .first-column .menu-column-title`,
          `.menu-columns.${this.anchor} .first-column li`,
          `.menu-columns.${this.anchor} .second-column .menu-column-title`,
          `.menu-columns.${this.anchor} .second-column li`,
          `.menu-columns.${this.anchor} .third-column .menu-column-title`,
          `.menu-columns.${this.anchor} .third-column li`,
        ],
        translateX: -100,
        opacity: 0,
        duration: 1000,
        direction: "reverse",
        easing: "easeInQuart",
        delay: function(el, i, l) {
          return (l - i) * 25 + 500;
        },
        endDelay: function(el, i, l) {
          return i * 25 + 500;
        },
      });
    },
    animateOut() {
      const thirdColumnItems = [].slice
        .call(
          document.querySelectorAll(
            `.menu-columns.${this.anchor} .third-column li`
          )
        )
        .reverse();
      const secondColumnItems = [].slice
        .call(
          document.querySelectorAll(
            `.menu-columns.${this.anchor} .second-column li`
          )
        )
        .reverse();
      const firstColumnItems = [].slice
        .call(
          document.querySelectorAll(
            `.menu-columns.${this.anchor} .first-column li`
          )
        )
        .reverse();

      this.$anime({
        targets: [
          thirdColumnItems,
          `.menu-columns.${this.anchor} .third-column .menu-column-title`,
          secondColumnItems,
          `.menu-columns.${this.anchor} .second-column .menu-column-title`,
          firstColumnItems,
          `.menu-columns.${this.anchor} .first-column .menu-column-title`,
        ],
        translateX: -100,
        opacity: 0,
        duration: 500,
        easing: "easeOutQuart",
        delay: function(el, i, l) {
          return i * 25 + 75;
        },
        endDelay: function(el, i, l) {
          return (l - i) * 25 + 75;
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";

.menu-columns {
  display: grid;
  grid-template-columns: minmax(min-content, auto) minmax(min-content, auto) minmax(
      min-content,
      auto
    );
  grid-gap: $space-2;
  margin: $space-4;
  margin-top: $space-2;
  margin-bottom: 0;
  height: auto;
  .menu-column {
    width: 100%;
    margin-top: calc(-1 * (#{$space-2}));
    .menu-column-title {
      will-change: opacity, transform;
      margin: $space-2 0;
      color: $colorBlack;
      font-weight: $fontWeightBold;
      text-transform: uppercase;
      letter-spacing: 3px;
      span {
        opacity: 0.44;
      }
    }
    .menu-column-links {
      line-height: 1.76;
      a {
        color: $colorBlack;
        font-weight: $fontWeightSemiBold;
        font-size: $fontSize4;
        transition: 0.5s;
        &:hover {
          color: $colorDarkGray;
        }
      }
    }
    .menu-column-address {
      line-height: 1.76;
      color: $colorBlack;
      font-weight: $fontWeightSemiBold;
      font-size: $fontSize4;
    }
  }
}

@media #{$tablet} {
  .menu-columns {
    margin: 0 $space-1;
    grid-template-columns: minmax(min-content, auto) minmax(min-content, auto);
    align-items: flex-start;
    width: 100%;
    .menu-column {
      max-width: unset;
      width: 100%;
      margin: 0 $space-1;
      .menu-column-title {
        margin: $space-1 0;
      }
      .menu-column-links {
        a {
          font-size: $fontSize4;
        }
      }
      .menu-column-address {
        font-size: $fontSize4;
      }
    }
  }
}

@media #{$mobile} {
  .menu-columns {
    grid-template-columns: minmax(min-content, auto);

    .menu-column {
      margin: 0;
      .menu-column-links {
        a {
          font-size: $fontSize3;
        }
      }
      .menu-column-address {
        font-size: $fontSize3;
      }
    }
  }
}
</style>
