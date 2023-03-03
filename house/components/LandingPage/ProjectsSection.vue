<template>
  <section-container
    :isActive="isActive"
    class="projects"
    leftColor="#FEFEFE"
    rightColor="#FFFFFF"
    :isDark="false"
  >
    <div class="projects-header">Current + Future Projects</div>
    <tilt class="project-current">
      <project-card
        :project="projects[currentIndex]"
        :projectIndex="currentIndex"
        :projectNext="projectNext"
        :projectPrev="projectPrev"
        :projectsTotal="projects.length"
        :isAnimateIn="inAnchor === anchor"
      />
    </tilt>
    <projects-map
      :projects="projects"
      :currentIndex="currentIndex"
      :setCurrentProject="setCurrentProject"
      :isAnimateIn="inAnchor === anchor"
    ></projects-map>
    <mq-layout mq="tablet+" class="projects-footer">
      <span class="left-arrow"></span>
      <span class="right-arrow"></span> Drag to navigate
    </mq-layout>
  </section-container>
</template>

<script>
import ProjectCard from "./ProjectCard.vue";
import ProjectsMap from "./ProjectsMap.vue";

export default {
  name: "ProjectsSection",
  components: {
    ProjectCard,
    ProjectsMap,
  },
  props: {
    anchor: String,
    projects: Array,
  },
  data() {
    return {
      isActive: false,
      currentIndex: 0,
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
    projectNext() {
      let next = this.currentIndex + 1;
      if (next >= this.projects.length) {
        next -= this.projects.length;
      }
      this.currentIndex = next;
    },
    projectPrev() {
      let prev = this.currentIndex - 1;
      if (prev <= -1) {
        prev += this.projects.length;
      }
      this.currentIndex = prev;
    },
    setCurrentProject(index) {
      this.currentIndex = index;
    },
    animateIn() {
      this.$anime({
        targets: [".projects-header", ".project-current", ".projects-footer"],
        translateX: -100,
        opacity: 0,
        direction: "reverse",
        duration: 500,
        endDelay: 500,
        easing: "easeInQuart",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~assets/styles/scss/base";
.projects {
  .projects-header {
    z-index: $zIndexPageContent;
    will-change: opacity, transform;
    position: absolute;
    top: 0;
    right: 0;
    padding: $space-3;
    font-size: $fontSize3;
    font-weight: $fontWeightSemiBold;
    pointer-events: none;
  }
  .project-current {
    will-change: opacity, transform;
    z-index: $zIndexPageContent;
    /* margin: $space-3 0; */
    position: relative;
  }
  .projects-footer {
    will-change: opacity, transform;
    z-index: $zIndexPageContent;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: $space-3;
    font-size: $fontSize2;
    font-weight: $fontWeightSemiBold;
    text-transform: uppercase;
    letter-spacing: 5px;
    pointer-events: none;
    .left-arrow,
    .right-arrow {
      width: 10px;
      height: 10px;
      display: inline-block;
      border-right: 3px solid $colorBlack;
      border-top: 3px solid $colorBlack;
      transform: rotate(-135deg);
    }
    .right-arrow {
      transform: rotate(45deg);
      margin-right: $space-1;
    }
  }
}

@media #{$tablet} {
  .projects {
    min-height: 100vh;
    height: 100%;
    padding: 0 $space-3;
    .project-current {
      margin: 0 $space-2;
    }
  }
}

@media #{$mobile} {
  .projects {
    min-height: 800px;
    height: 100%;
    display: flex;
    align-items: flex-end;
    padding: 0;
    .project-current {
      width: calc(100% - #{$space-2} * 2);
      margin: $space-2;
    }
  }
}
</style>
