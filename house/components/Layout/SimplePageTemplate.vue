<template>
  <div class="page-content" style="opacity: 0;">
    <mq-layout :mq="['mobile', 'tablet']">
      <slot></slot>
    </mq-layout>
    <mq-layout mq="desktop">
      <div class="fullpage-container">
        <no-ssr>
          <full-page ref="fullpage" :options="fullPageOptions" id="fullpage">
            <div class="section">
              <div class="section-container">
                <slot></slot>
                <footer-waypoint></footer-waypoint>
              </div>
            </div>
          </full-page>

          <slot slot="placeholder"></slot>
        </no-ssr>
      </div>
    </mq-layout>
    <portal-target name="modals"></portal-target>
  </div>
</template>

<script>
import FooterWaypoint from "../Layout/FooterWaypoint.vue";

export default {
  name: "SimplePageTemplate",
  components: { FooterWaypoint },
  data() {
    return {
      fullPageOptions: {
        licenseKey: "CD4BDEC4-341944FA-A7130611-6B6E1EB1",
        scrollOverflow: true,
        autoScrolling: true,
        fitToSection: false,
        css3: true,
        scrollingSpeed: 1000,
        easingcss3: "cubic-bezier(1, 0.2, 0.2, 1)",
      },
    };
  },
  mounted() {
    if (this.$mq === "desktop") {
      this.$store.commit("layout/hideFooter");
      setTimeout(() => {
        this.$refs.fullpage.api.reBuild();
      }, 1000);
    }

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
}

#fullpage {
  display: block;
  position: relative;
  height: 100%;

  .fp-table-Cell {
    display: flex;
    align-items: center;
  }
}
</style>
