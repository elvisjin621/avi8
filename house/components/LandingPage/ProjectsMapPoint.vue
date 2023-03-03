<template>
  <div
    class="map-point-container"
    :style="pointPositionStyle"
    @mouseover="setCurrentProject"
    @click="setCurrentProject"
  >
    <div
      :class="['map-point', isCurrent && 'is-current', isActive && 'is-active']"
    ></div>
  </div>
</template>

<script>
export default {
  name: "ProjectsMapPoint",
  props: {
    projectIndex: Number,
    top: Number,
    left: Number,
    setCurrent: Function,
    isCurrent: Boolean,
    isActive: Boolean,
  },
  computed: {
    pointPositionStyle() {
      return `
        top: ${this.top}%;
        left: ${this.left}%;
      `;
    },
  },
  methods: {
    setCurrentProject() {
      this.setCurrent(this.projectIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";
.map-point-container {
  will-change: opacity, transform;
  z-index: $zIndexProjectsMapPoint;
  position: absolute;
  height: 0;
  width: 0;
  .map-point {
    width: 32px;
    height: 32px;
    transform: translate3d(-50%, -50%, 0);
    background-image: url("~assets/svg/point-gold.svg");
    background-position: 50% 50%;
    background-repeat: no-repeat;
    &:hover {
      cursor: url("~assets/images/dot-cursor-8.png") 4 4, auto;
    }
    &.is-active {
      background-image: url("~assets/svg/point-green.svg");
    }
    &.is-current {
      background-image: url("~assets/svg/point-current-gold.svg");
    }
    &.is-current.is-active {
      background-image: url("~assets/svg/point-current-green.svg");
    }
  }
}
</style>
