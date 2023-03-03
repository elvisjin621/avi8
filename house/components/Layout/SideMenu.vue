<template>
  <div :class="['side-menu', isMenuOpen && 'is-open']">
    <menu-columns
      :isAnimated="isMenuOpen"
      :close="closeMenu"
      anchor="side"
    ></menu-columns>
    <div class="menu-bottom">
      <div class="menu-bottom-column">
        <div class="menu-bottom-column-text">
          <nuxt-link
            v-if="false"
            to="/privacy-policy"
            @click.native="closeMenu"
          >
            <span>Privacy policy</span>
          </nuxt-link>
        </div>
      </div>
      <div class="menu-bottom-column">
        <div class="menu-bottom-column-text">
          <span>Avi8ted House 2021 © All Rights Reserved</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuColumns from "../Layout/MenuColumns.vue";

export default {
  name: "SideMenu",
  components: { MenuColumns },
  data() {
    return {
      animateInitStyle: "opacity: 0; transform: translateX(-100px);",
    };
  },
  computed: {
    isMenuOpen() {
      return this.$store.state.layout.isMenuOpen;
    },
  },
  watch: {
    isMenuOpen(newValue, oldValue) {
      if (newValue) {
        this.animateIn();
      } else {
        this.animateOut();
      }
    },
  },
  methods: {
    closeMenu() {
      this.$store.commit("layout/closeMenu");
    },
    animateIn() {
      this.$anime({
        targets: [".side-menu .menu-bottom-column"],
        translateX: 0,
        opacity: 1,
        duration: 0,
      });
      this.$anime({
        targets: [".side-menu .menu-bottom-column"],
        translateX: -100,
        opacity: 0,
        duration: 1000,
        direction: "reverse",
        easing: "easeInQuart",
        delay: function(el, i, l) {
          return (l - i) * 25 + 750;
        },
        endDelay: function(el, i, l) {
          return i * 25 + 750;
        },
      });
    },
    animateOut() {
      const bottomColumnTextItems = [].slice
        .call(document.querySelectorAll(".side-menu .menu-bottom-column"))
        .reverse();

      this.$anime({
        targets: [bottomColumnTextItems],
        translateX: -100,
        opacity: 0,
        duration: 500,
        easing: "easeOutQuart",
        delay: function(el, i, l) {
          return i * 25;
        },
        endDelay: function(el, i, l) {
          return (l - i) * 25;
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";

.side-menu {
  z-index: $zIndexSideMenu;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $colorWhite;
  transition: transform 1s cubic-bezier(1, 0.2, 0.2, 1);
  transform: translateX(-100%);
  will-change: transform;
  height: 100%;
  width: 100%;
  padding: $space-4 $space-3 $space-3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .menu-columns {
    z-index: $zIndexSideMenu;
  }
  .menu-bottom {
    z-index: $zIndexSideMenu;
    position: absolute;
    bottom: $space-3;
    width: calc(100% - #{$space-3} * 2);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .menu-bottom-column {
      will-change: opacity, transform;
      max-width: calc(100% / 3);
      .menu-bottom-column-text {
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
  }
  &.is-open {
    transform: translateX(0);
  }
}

@media #{$tablet} {
  .side-menu {
    padding: $space-4 $space-3 $space-3;
    align-items: start;
    .menu-bottom {
      position: relative;
      bottom: 0;
      margin: $space-1;
      width: calc(100% - #{$space-1} * 2);
      .menu-bottom-column {
        max-width: unset;
        width: 100%;
        margin-bottom: calc(#{$space-1} / 2);
      }
    }
  }
}

@media #{$mobile} {
  .side-menu {
    padding: $space-3 $space-2 $space-2;
    .menu-bottom {
      flex-direction: column;
    }
  }
}
</style>
