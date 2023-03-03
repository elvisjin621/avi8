<template>
  <section-container
    leftColor="#FEFEFE"
    rightColor="#FFFFFF"
    :isDark="false"
    :class="['program', anchor]"
    :isActive="isActive"
  >
    <tilt v-if="showLeftImage" class="program-image-container">
      <div
        class="program-image"
        :style="`background-image: url('${imageSrc}');`"
      ></div>
    </tilt>
    <div class="program-content">
      <div class="program-card">
        <div
          class="program-head"
          :style="
            $mq
              | mq({
                mobile: `background-image: url('${imageSrc}');`,
                tablet: 'background-image:none;',
              })
          "
        >
          <span class="program-heading">{{ subtitle }}</span>
          <h2 class="program-title">{{ title }}</h2>
        </div>
        <p v-if="subheading" class="program-subheading">{{ subheading }}</p>
        <div v-if="Array.isArray(description)">
          <p class="program-description"
            v-for="(line, i) in description"
            :key="i"
            v-html="line">
          </p>
        </div>
        <div v-else>
          <div class="program-description"
            v-html="description"
          >
          </div>
        </div>
        <div class="program-buttons">
          <membership-link />
          <book-now />
        </div>

        <div class="program-more" v-if="moreLink">
          <nuxt-link :to="moreLink">Learn more</nuxt-link>
        </div>
      </div>
    </div>
    <tilt v-if="showRightImage" class="program-image-container">
      <div
        class="program-image"
        :style="`background-image: url('${imageSrc}');`"
      ></div>
    </tilt>
  </section-container>
</template>

<script>
export default {
  name: "ProgramsSection",
  props: {
    imageSrc: String,
    title: String,
    subtitle: String,
    subheading: String,
    description: String,
    slug: String,
    moreLink: String,
    isFlipped: Boolean,
    anchor: String,
  },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    inAnchor() {
      return this.$store.state.fullpage.inAnchor;
    },
    showRightImage() {
      return this.$mq !== "mobile" && this.isFlipped;
    },
    showLeftImage() {
      return this.$mq !== "mobile" && !this.isFlipped;
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
    animateIn() {
      this.$anime({
        targets: [
          `.program.${this.anchor} .program-image-container`,
          `.program.${this.anchor} .program-heading`,
          `.program.${this.anchor} .program-title`,
          `.program.${this.anchor} .program-subheading`,
          `.program.${this.anchor} .program-description`,
          `.program.${this.anchor} .program-buttons`,
          `.program.${this.anchor} .program-more`,
        ],
        translateX: -100,
        opacity: 0,
        duration: 500,
        direction: "reverse",
        easing: "easeInQuart",
        delay: function(el, i, l) {
          return (l - i) * 50 + 500;
        },
        endDelay: function(el, i, l) {
          return i * 50 + 500;
        },
      });
      this.$anime({
        targets: [`.program.${this.anchor} .program-image`],
        scale: 1.2,
        duration: 1500,
        endDelay: 500,
        direction: "reverse",
        easing: "easeInQuart",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";

.program-image-container {
  will-change: opacity, transform;
  width: 50%;
  height: calc(100vh - #{$space-4} * 2);
  overflow: hidden;
  z-index: $zIndexPageContent;
  .program-image {
    will-change: transform;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
  }
}
.program-content {
  z-index: $zIndexPageContent;
  height: calc(100vh - #{$space-4} * 2);
  padding: 0 $space-3;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  .program-card {
    // max-width: 340px;
    .program-head {
      .program-heading {
        will-change: opacity, transform;
        color: $colorBlack;
        text-transform: uppercase;
        font-weight: $fontWeightSemiBold;
        letter-spacing: 2.5px;
      }
      .program-title {
        color: $colorBlack;
        will-change: opacity, transform;
      }
    }
    .program-subheading {
      width: 100%;
      text-align: center;
    }
    .program-description {
      will-change: opacity, transform;
      margin: 0;
      font-size: $fontSize2;
    }
    .program-buttons {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: $space-2;
      & > * {
        margin-bottom: $space-2;
      }
    }
    .program-more {
      will-change: opacity, transform;
      color: $colorBlack;
      font-weight: $fontWeightSemiBold;
      font-size: $fontSize2;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      margin-bottom: $space-1;
      a {
        color: $colorBlack;
      }
      &:after {
        content: "•";
        margin: $space-1;
      }
    }
  }
}

@media #{$tablet} {
  .program {
    padding: 0 $space-3;
    .program-image-container {
      margin: 0 $space-2;
    }
    .program-content {
      height: auto;
      margin: 0;
      padding: 0 $space-2;
    }
  }
}

@media #{$mobile} {
  .program {
    padding: 0;
    .program-content {
      height: auto;
      margin: 0;
      padding: 0;
      width: 100%;
      .program-card {
        max-width: unset;
        .program-head {
          width: 100%;
          padding: $space-4 $space-2 $space-1 $space-3;
          background-size: cover;
          background-position: center center;
          .program-heading {
            display: none;
          }
          .program-title {
            font-size: $fontSize4;
            color: $colorWhite;
            margin: 0;
            text-shadow: 1px 1px 0 $colorBlack, 1px -1px 0 $colorBlack,
              -1px 1px 0 $colorBlack, -1px -1px 0 $colorBlack,
              1px 0px 0 $colorBlack, 0px 1px 0 $colorBlack,
              -1px 0px 0 $colorBlack, 0px -1px 0 $colorBlack,
              1px 1px 0px rgba(0, 0, 0, 0);
          }
        }
        .program-description {
          margin: $space-05;
          padding-left: $space-3;
          font-size: $fontSize1;
        }
        .program-more {
          font-size: $fontSize1;
          margin-top: $space-2;
          margin-left: $space-3;
          margin-bottom: $space-2;
        }
      }
    }
  }
}
</style>
