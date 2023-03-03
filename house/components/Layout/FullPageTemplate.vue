<template>
  <div class="page-content" style="opacity: 0;">
    <mq-layout :mq="['mobile', 'tablet']">
      <slot></slot>
    </mq-layout>
    <mq-layout mq="desktop">
      <div class="fullpage-container">
        <no-ssr>
          <full-page ref="fullpage" :options="fullPageOptions" id="fullpage">
            <slot></slot>
            <footer-waypoint></footer-waypoint>
          </full-page>

          <slot slot="placeholder"></slot>
        </no-ssr>
      </div>
      <scroll-progress v-if="anchors.length > 1" />
    </mq-layout>
    <portal-target name="modals"></portal-target>
  </div>
</template>

<script>
import ScrollProgress from "./ScrollProgress.vue";
import FooterWaypoint from "./FooterWaypoint.vue";

export default {
  name: "FullPageTemplate",
  components: {
    ScrollProgress,
    FooterWaypoint,
  },
  props: {
    anchors: { type: Array, default: [] },
  },
  computed: {
    fullPageOptions() {
      return {
        licenseKey: "CD4BDEC4-341944FA-A7130611-6B6E1EB1",
        verticalCentered: true,
        anchors: this.anchors,
        autoScrolling: this.$mq === "desktop",
        fitToSection: this.$mq === "desktop",
        css3: true,
        scrollingSpeed: 1000,
        easingcss3: "cubic-bezier(1, 0.2, 0.2, 1)",
        normalScrollElements: "footer",
        onLeave: this.onLeave,
      };
    },
  },
  methods: {
    onLeave(origin, destination, direction) {
      if (destination) {
        this.$store.commit("fullpage/setItemCurrent", destination.index);
        this.$store.commit("fullpage/setInAnchor", destination.anchor);
      }
      if (origin) {
        this.$store.commit("fullpage/setOutAnchor", origin.anchor);
      }
    },
  },
  mounted() {
    if (this.$mq === "desktop") {
      this.$store.commit("layout/hideFooter");
      this.$store.commit("layout/disallowFooter");
    }
    this.$store.commit("fullpage/setItemCurrent", 0);
    this.$store.commit("fullpage/setItemsTotal", this.anchors.length);
    this.$anime({
      targets: ".page-content",
      opacity: 1,
      duration: 500,
      easing: "easeOutQuart",
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";
.fullpage-container {
  position: relative;
  height: 100%;
  .fullpage-wrapper {
    will-change: transform;
    display: block;
    position: relative;
    height: 100%;
    .fp-table-Cell {
      display: flex;
      align-items: center;
    }
  }
}
</style>
