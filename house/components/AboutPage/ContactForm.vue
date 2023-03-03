<template>
  <div class="join-form"><div id="hubspotForm"></div></div>
</template>

<script>
export default {
  name: "ContactForm",
  mounted() {
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: "20281711",
          formId: "d934c8e2-19ba-43ca-9143-956cc1ffa62c",
          target: "#hubspotForm",
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";

.join-form {
  padding: $space-3;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

@media #{$tablet} {
  .join-form {
    padding: $space-2;
  }
}

@media #{$mobile} {
  .join-form {
    padding: $space-1;
  }
}
</style>
