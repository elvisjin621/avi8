import Vue from "vue";
import VueMq from "vue-mq";

Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    desktop: Infinity
  },
  defaultBreakpoint: "desktop" // customize this for SSR
});
