<template>
  <simple-page-template>
    <div class="error-container">
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>An error occurred</h1>
      <no-ssr>
        <particles-background :opacity="0.2"></particles-background>
      </no-ssr>
    </div>
  </simple-page-template>
</template>

<script>
import SimplePageTemplate from "../components/Layout/SimplePageTemplate.vue";

export default {
  props: ["error"],
  components: { SimplePageTemplate },
  mounted() {
    this.$nextTick(() => {
      this.$store.commit("layout/setLightBackground");
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$anime({
      targets: ".page-content",
      opacity: 0,
      duration: 500,
      easing: "easeOutQuart"
    });
    setTimeout(() => {
      next();
    }, 500);
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";

.error-container {
  z-index: $zIndexPageContent;
  overflow: hidden;
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $space-4;
}

@media #{$tablet} {
  .error-container {
    padding: $space-3;
    h1 {
      font-size: $fontSize4;
    }
  }
}
@media #{$mobile} {
  .error-container {
    padding: $space-2;
    h1 {
      font-size: $fontSize4;
    }
  }
}
</style>
