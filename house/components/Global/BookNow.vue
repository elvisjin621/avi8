<template>
  <div>
    <button class="book-button" v-on:click="openModal">Book Now</button>

    <portal to="modals" v-if="open">
      <div class="book-now-overlay">
        <div class="book-now-modal">
          <div class="book-now-controls">
            <button v-on:click="closeModal" class="close-button">Close</button>
          </div>
          <div id="hubspotForm" class="book-now-form"></div>
        </div>
      </div>
    </portal>
  </div>
</template>

<script>
export default {
  name: "BookNow",
  data() {
    return {
      open: false,
    };
  },
  methods: {
    openModal() {
      this.open = true;
      this.$store.commit("layout/setLightBackground");
    },
    closeModal() {
      this.open = false;
      this.$store.commit("layout/setDarkBackground");
    },
  },
  watch: {
    open() {
      if (open) {
        if (window.hbspt) {
          window.hbspt.forms.create({
            region: "na1",
            portalId: "20281711",
            formId: "816c8f48-5244-431e-92bd-3c860a72ce7a",
            target: "#hubspotForm",
          });
        }
      }
    },
  },
  mounted() {
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";

.book-button {
  width: 120px;
  text-align: center;
  padding: $space-1;
  font-size: $fontSize2;
  font-weight: $fontWeightSemiBold;
  background: $colorDarkestGray;
  color: $colorLightGray;
  display: block;
  height: 100%;
}

.book-now-overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.75);
  .book-now-modal {
    width: 100%;
    max-width: 700px;
    height: 70vh;
    background: $colorWhite;
    display: flex;
    flex-direction: column;
    .book-now-controls {
      padding: $space-2;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .close-button {
        text-align: center;
        padding: $space-05;
        font-size: $fontSize2;
        font-weight: $fontWeightSemiBold;
        background: $colorLightGray;
        color: $colorDarkestGray;
      }
    }
    .book-now-form {
      overflow: auto;
      padding: $space-2;
    }
  }
}

@media #{$tablet} {
  .book-now-overlay {
    z-index: 3;
    .book-now-modal {
      height: 100%;
      .book-now-form {
        padding-left: $space-3;
      }
    }
  }
}

@media #{$mobile} {
  .join-form {
    // padding: $space-1;
  }
}
</style>
