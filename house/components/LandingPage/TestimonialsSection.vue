<template>
  <section-container
    leftColor="#FEFEFE"
    rightColor="#FFFFFF"
    :isDark="false"
    :isActive="isActive"
    class="testimonials"
  >
    <div class="testimonials-container">
      <testimonials-slider
        :slides="slides"
        :isAnimateIn="inAnchor === anchor"
      ></testimonials-slider>
    </div>
  </section-container>
</template>

<script>
import TestimonialsSlider from "./TestimonialsSlider.vue";

export default {
  name: "TestimonialsSection",
  components: { TestimonialsSlider },
  props: {
    anchor: String,
    slides: Array,
  },
  data() {
    return {
      isActive: false,
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
  methods: {
    animateIn() {
      this.$anime({
        targets: [".testimonials .testimonials-slider"],
        translateX: -100,
        opacity: 0,
        duration: 500,
        direction: "reverse",
        easing: "easeInQuart",
        endDelay: 750,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";
.testimonials-container {
  z-index: $zIndexPageContent;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;

  .testimonials-slider {
    will-change: opacity, transform;
    margin-bottom: 100px;
    min-height: 440px;
  }
}

@media #{$tablet} {
  .testimonials-container {
    width: calc(100% - #{$space-2} * 2);
    margin: 0 $space-2;
    padding: $space-3 $space-3 $space-2;
    flex-direction: column;
    justify-content: space-between;
    .testimonials-slider {
      min-height: 515px;
      margin: 0;
    }
  }
}

@media #{$mobile} {
  .testimonials-container {
    padding: $space-3 $space-1;
    .testimonials-slider {
      min-height: 375px;
    }
  }
}
</style>
