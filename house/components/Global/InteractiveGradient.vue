<template>
  <div class="gradient" :style="gradientPositionStyle"></div>
</template>

<script>
import gradientLight from "../../assets/images/gradient-light.png";
import gradientDark from "../../assets/images/gradient-dark.png";

export default {
  name: "InteractiveGradient",
  props: {
    isDark: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    top() {
      return this.$store.state.layout.cursorPosition.top - 500;
    },
    left() {
      return this.$store.state.layout.cursorPosition.left - 500;
    },
    gradientPositionStyle() {
      const gradient = this.isDark ? gradientDark : gradientLight;
      return `
        left: ${this.left}px;
        top: ${this.top}px;
        background-image: url(${gradient});
        will-change: top, left;
      `;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";

.gradient {
  z-index: 1;
  pointer-events: none;
  position: absolute;
  width: 1000px;
  height: 1000px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
  opacity: 0.4;
}
</style>
