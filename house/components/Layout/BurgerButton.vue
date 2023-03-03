<template>
  <div
    class="burger-button-container"
    style="opacity: 0; transform: translateX(-100px) translateY(-50%);"
  >
    <div
      :class="['burger-button', isMenuOpen && 'is-open', isDarkBackground && 'is-white']"
      @click="toggleMenu"
      style="height: 0;"
    >
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BurgerButton",
  computed: {
    isMenuOpen() {
      return this.$store.state.layout.isMenuOpen;
    },
    isDarkBackground() {
      return this.$store.state.layout.isDarkBackground;
    }
  },
  methods: {
    toggleMenu() {
      this.$store.commit("layout/toggleMenu");
    }
  },
  mounted() {
    const targets = this.$el;
    this.$anime({
      targets,
      translateX: 0,
      translateY: "-50%",
      opacity: 1,
      easing: "easeOutQuart"
    });
    this.$anime({
      targets: ".burger-button",
      height: 25,
      duration: 1500,
      easing: "easeOutQuart"
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";

.burger-button-container {
  position: fixed;
  top: 50%;
  padding: $space-3;
  z-index: $zIndexBurgerButton;
  transform: translateY(-50%);
  .burger-button {
    position: relative;
    width: 25px;
    height: 25px;
    &:hover {
      cursor: url("~assets/images/dot-cursor-16.png") 8 8, auto;
    }
    div {
      position: absolute;
      height: 100%;
      width: 1px;
      background-color: $colorBlack;
      transition: 0.7s cubic-bezier(1, 0.2, 0.2, 1);

      &:first-of-type {
        left: 7px;
      }
      &:last-of-type {
        left: 17px;
      }
    }
    &.is-white {
      div {
        background-color: $colorWhite;
      }
    }
    &.is-open {
      div {
        background-color: $colorWhite;
        &:first-of-type {
          transform: rotate(-45deg) translateX(7px);
        }
        &:last-of-type {
          transform: rotate(45deg) translateX(-7px);
        }
      }
    }
  }
}

@media #{$tablet} {
  .burger-button-container {
    padding: $space-2;
  }
}

@media #{$mobile} {
  .burger-button-container {
    padding: $space-1;
  }
}
</style>
