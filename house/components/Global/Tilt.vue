<template>
  <div class="tilt">
    <slot></slot>
  </div>
</template>

<script>
import VanillaTilt from "vanilla-tilt";

export default {
  name: "TiltContainer",
  mounted() {
    if (this.$mq === "desktop") {
      this.$nextTick(() => {
        this.initTilt();
      });
    }
  },
  methods: {
    initTilt() {
      VanillaTilt.init(this.$el, {
        max: 15,
        speed: 1500,
        transition: true
      });
    }
  }
};
</script>

<style lang="scss" >
@import "~assets/styles/scss/base";

.tilt {
  display: inline-block;
  will-change: transform;
}
</style>
