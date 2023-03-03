<template>
  <div class="section">
    <div class="section-container">
      <slot></slot>
      <mq-layout mq="desktop">
        <interactive-gradient
          v-if="isActive"
          :isDark="isDark"
        ></interactive-gradient>
      </mq-layout>
      <no-ssr>
        <interactive-background
          :leftColor="leftColor"
          :rightColor="rightColor"
        ></interactive-background>
      </no-ssr>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionContainer",
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    isDark: {
      type: Boolean,
      default: false,
    },
    leftColor: {
      type: String,
      default: "#FEFEFE",
    },
    rightColor: {
      type: String,
      default: "#FFFFFF",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";
.section {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  min-height: 100vh;
  padding: 0 $space-4;
  overflow: hidden;

  .section-container {
    height: 100%;
    display: flex;
    align-items: center;
    padding: $space-2;
    z-index: $zIndexPageContent;
  }
}

@media #{$tablet} {
  .section {
    height: auto;
    padding: 0;
    .section-container {
      width: 100%;
      padding: 0;
    }
  }
}

@media #{$mobile} {
  .section {
    height: auto;
    padding: 0;
    min-height: unset;
    .section-container {
      width: 100%;
      padding: 0;
    }
  }
}
</style>
