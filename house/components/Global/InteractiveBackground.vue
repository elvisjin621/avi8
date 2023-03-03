<template>
  <div class="background-wrapper" :style="backgroundColor"></div>
</template>

<script>
export default {
  name: "InteractiveBackground",
  props: {
    rightColor: {
      type: String,
      default: "#000000",
    },
    leftColor: {
      type: String,
      default: "#121212",
    },
  },
  computed: {
    backgroundColor() {
      return {
        "background-color": this.color,
      };
    },
    horizontalCursorPosition() {
      return this.$store.state.layout.cursorPosition.left;
    },
    color() {
      if (this.horizontalCursorPosition > window.innerWidth / 2) {
        return this.rightColor;
      } else {
        return this.leftColor;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";

.background-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: background-color 1s;
}
</style>
