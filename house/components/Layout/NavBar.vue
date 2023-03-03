<template>
  <nav style="opacity: 0; transform: translateX(-100px);">
    <link-home anchor="#home">
      <logo></logo>
    </link-home>
  </nav>
</template>

<script>
import Logo from "./Logo.vue";

export default {
  name: "NavBar",
  components: { Logo },
  mounted() {
    const targets = this.$el;
    this.$anime({
      targets,
      translateX: 0,
      opacity: 1,
      easing: "easeOutQuart"
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";

nav {
  position: fixed;
  top: 0;
  left: 0;
  /* width: 100%; */
  z-index: $zIndexNavBar;
  display: flex;
}
</style>
