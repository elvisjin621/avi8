<template>
  <div
    class="side-links-container"
    style="opacity: 0; transform: translateX(-100px);"
  >
    <ul :class="['side-links', isDarkBackground && 'is-white']">
      <li>
        <nuxt-link to="/about">About Us</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideLinks",
  computed: {
    isDarkBackground() {
      return this.$store.state.layout.isDarkBackground;
    },
  },
  mounted() {
    const targets = this.$el;
    this.$anime({
      targets,
      translateX: 0,
      opacity: 1,
      easing: "easeOutQuart",
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";

.side-links-container {
  position: fixed;
  bottom: 0;
  padding: $space-3;
  z-index: $zIndexSideNav;
  .side-links {
    writing-mode: tb-rl;
    transform: rotate(-180deg);
    a {
      vertical-align: middle;
      letter-spacing: 5px;
      text-transform: uppercase;
      color: $colorBlack;
      font-weight: $fontWeightBold;
    }
    &.is-white {
      a {
        color: $colorWhite;
      }
    }
  }
}

@media #{$tablet} {
  .side-links-container {
    padding: $space-2;
  }
}

@media #{$mobile} {
  .side-links-container {
    padding: $space-2 $space-1;
  }
}
</style>
