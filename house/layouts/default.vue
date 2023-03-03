<template>
  <div
    :class="['page-container', isFooterVisible && 'show-footer']"
    @wheel="scrollFooter"
  >
    <nav-bar></nav-bar>
    <burger-button></burger-button>
    <side-menu></side-menu>
    <side-links v-if="this.$route.name !== 'about'"></side-links>
    <nuxt />
    <footer-section></footer-section>
    <cookie-consent></cookie-consent>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import NavBar from "../components/Layout/NavBar.vue";
import BurgerButton from "../components/Layout/BurgerButton.vue";
import SideMenu from "../components/Layout/SideMenu.vue";
import SideLinks from "../components/Layout/SideLinks.vue";
import FooterSection from "../components/Layout/FooterSection.vue";

export default {
  components: {
    NavBar,
    BurgerButton,
    SideMenu,
    SideLinks,
    FooterSection,
  },
  computed: {
    isFooterVisible() {
      return this.$store.state.layout.isFooterVisible && this.$mq === "desktop";
    },
  },
  methods: {
    scrollFooter: debounce(
      function(e) {
        if (
          this.$store.state.layout.isFooterAllowed &&
          this.$mq === "desktop"
        ) {
          if (e.deltaY < 0) {
            this.$store.commit("layout/hideFooter");
          } else if (e.deltaY > 0) {
            this.$store.commit("layout/showFooter");
          }
        }
      },
      50,
      {
        leading: true,
        trailing: false,
      }
    ),
    setCursorPosition: throttle(function(e) {
      this.$store.commit("layout/setCursorPosition", {
        top: e.clientY,
        left: e.clientX,
      });
    }, 30),
  },
  mounted() {
    window.addEventListener("mousemove", this.setCursorPosition);
  },
};
</script>

<style lang="scss">
@import "~assets/styles/scss/base";
.page-container {
  will-change: transform;
  position: relative;
  min-height: 100vh;
  height: 100%;
  transition: transform 1s cubic-bezier(1, 0.2, 0.2, 1);
  &.show-footer {
    transform: translateY(-100vh);
  }
}

@media #{$tablet} {
  .page-container {
    will-change: unset;
    &.show-footer {
      transform: translateY(0);
    }
  }
}
</style>
