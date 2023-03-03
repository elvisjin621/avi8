<template>
  <div
    class="logo"
    @mouseover="handleHover"
    @mouseout="handleOut"
    @click="handleClick"
  >
    <mq-layout mq="tablet+">
      <img src="../../assets/svg/Logo.svg" width="100x" height="80px" alt="Avi8ted House" />
    </mq-layout>
    <mq-layout mq="mobile">
      <img src="../../assets/svg/Logo.svg" width="100px" height="80px" alt="Avi8ted House" />
    </mq-layout>
  </div>
</template>

<script>
import LogoImageAnimated from "./LogoImageAnimated.vue";

export default {
  name: "Logo",
  components: { LogoImageAnimated },
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    isMenuOpen() {
      return this.$store.state.layout.isMenuOpen;
    },
    isDarkBackground() {
      return this.$store.state.layout.isDarkBackground;
    },
  },
  methods: {
    handleClick() {
      this.$store.commit("layout/closeMenu");
    },
    handleHover() {
      this.isExpanded = true;
    },
    handleOut() {
      this.isExpanded = false;
    },
  },
};
</script>

<style lang="scss">
@import "~assets/styles/scss/base";

.logo {
  padding: $space-2 $space-2;
  .logo-image {
    path {
      transition: fill 0.7s cubic-bezier(1, 0.2, 0.2, 1), opacity 0.5s 0.2s,
        transform 0.7s cubic-bezier(1, 0.2, 0.2, 1);
    }
    &.is-white {
      path {
        fill: $colorWhite;
      }
    }
  }
}

@media #{$tablet} {
  .logo {
    padding: $space-2 $space-1;
  }
}

@media #{$mobile} {
  .logo {
    padding: $space-05;
    .logo-image {
      width: 90px;
    }
  }
}
</style>
