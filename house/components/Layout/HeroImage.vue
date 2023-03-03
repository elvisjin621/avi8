<template>
  <div class="hero-image">
    <div class="image" :style="imageStyle"></div>
  </div>
</template>

<script>
export default {
  name: "Hero",
  props: {
    image: String,
  },
  data() {
    return {
      imageStyle: `background-image: url(${this.image})`,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";

.hero-image {
  .image {
    z-index: $zIndexPageContent;
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 40%;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}

@media #{$tablet} {
  .hero-image {
    .image {
      padding-bottom: 60%;
    }
  }
}

@media #{$mobile} {
  .hero-image {
    .image {
      padding-bottom: 75%;
    }
  }
}
</style>
