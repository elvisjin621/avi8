<template>
  <div></div>
</template>

<script>
export default {
  name: "CookieConsent",
  mounted() {
    require("cookieconsent");

    this.$nextTick(() => {
      this.initCookieConsent();
    });
  },
  methods: {
    initCookieConsent() {
      cookieconsent.initialise({
        palette: {
          popup: {
            background: "#121212",
            text: "#ffffff",
          },
          button: {
            background: "#ffffff",
            text: "#121212",
          },
        },
        theme: "classic",
        position: "bottom-right",
        // content: {
        //   href: "/privacy-policy",
        // },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
