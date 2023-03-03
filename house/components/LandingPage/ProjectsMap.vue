<template>
  <div class="projects-map-container" v-dragged="dragMapThrottled">
    <div class="draggable-layer" :style="mapPositionStyles">
      <div class="projects-map">
        <projects-map-point
          v-for="(project, i) in projects"
          :key="project.id"
          :top="project.top"
          :left="project.left"
          :projectIndex="i"
          :setCurrent="setCurrentProject"
          :isCurrent="currentIndex === i"
          :isActive="project.active"
        ></projects-map-point>
        <img src="../../assets/svg/Map.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import ProjectsMapPoint from "./ProjectsMapPoint.vue";

export default {
  name: "ProjectsMap",
  components: { ProjectsMapPoint },
  props: {
    isAnimateIn: Boolean,
    projects: Array,
    currentIndex: Number,
    setCurrentProject: Function,
  },
  data() {
    return {
      deltaX: 0,
    };
  },
  computed: {
    left() {
      if (this.$mq === "mobile") {
        return -150;
      } else if (this.$mq === "tablet") {
        return 325;
      } else {
        return 630;
      }
    },
    mapPositionStyles() {
      return `
        transform: translateX(${this.left + this.deltaX}px);
        transition: transform 1s;
        will-change: transform;
      `;
    },
  },
  watch: {
    isAnimateIn(newValue, oldValue) {
      if (newValue) {
        this.animateIn();
      }
    },
  },
  methods: {
    animateIn() {
      this.$anime({
        targets: [".projects-map img", ".projects-map .map-point-container"],
        translateX: -100,
        opacity: 0,
        duration: 1000,
        direction: "reverse",
        easing: "easeInQuart",
        delay: function(el, i, l) {
          return (l - i) * 50 + 750;
        },
        endDelay: function(el, i, l) {
          return i * 50 + 750;
        },
      });
    },
    dragMapThrottled: throttle(function({ deltaX }) {
      if (deltaX) {
        const min =
          this.$mq === "mobile" ? -600 : this.$mq === "tablet" ? -570 : -650;
        const max =
          this.$mq === "mobile" ? 150 : this.$mq === "tablet" ? 135 : 75;

        if (this.deltaX + deltaX < max && this.deltaX + deltaX > min) {
          this.deltaX += deltaX;
        }
      }
    }, 25),
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";
.projects-map-container {
  z-index: $zIndexProjectsMap;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .draggable-layer {
    height: 100%;
    padding: $space-3 0;
    position: absolute;
    .projects-map {
      position: relative;
      width: auto;
      height: 100%;
      img {
        will-change: opacity, transform;
        pointer-events: none;
        width: auto;
        height: 100%;
        left: 0;
        max-width: none;
        display: block;
        will-change: transform;
      }
    }
  }
  &:hover {
    cursor: url("~assets/images/drag-cursor-32.png") 16 16, all-scroll;
  }
}

@media #{$mobile} {
  .projects-map-container {
    .draggable-layer {
      padding: $space-2 0 $space-4;
    }
  }
}
</style>
