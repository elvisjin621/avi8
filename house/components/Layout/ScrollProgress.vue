<template>
  <div
    :class="['scroll-progress', isDarkBackground && 'is-white']"
    :style="progressStyle"
  >
    <div class="progress-line" :style="lineBeforeStyle"></div>
    <div class="numbers-wrapper" :style="numbersWrapperStyle">
      <div :class="['numbers', isAnimate && 'is-animate']">
        <div class="numbers-prev">0{{ prevItem + 1 }}</div>
        <div class="numbers-next">0{{ nextItem + 1 }}</div>
      </div>
    </div>
    <div class="progress-line" :style="lineAfterStyle"></div>
  </div>
</template>

<script>
export default {
  name: "ScrollProgress",
  data() {
    return {
      prevItem: this.$store.state.fullpage.itemCurrent,
      nextItem: this.$store.state.fullpage.itemCurrent,
      isAnimate: false,
    };
  },
  watch: {
    itemCurrent(next, prev) {
      this.isAnimate = true;
      this.prevItem = prev;
      this.nextItem = next;
      setTimeout(() => {
        this.isAnimate = false;
        this.prevItem = next;
        this.nextItem = prev;
      }, 500);
    },
  },
  computed: {
    itemsTotal: function() {
      return this.$store.state.fullpage.itemsTotal;
    },
    itemCurrent: function() {
      return this.$store.state.fullpage.itemCurrent;
    },
    progressStyle: function() {
      return {
        transform: `translateY(-50%)`,
        height: `${this.itemsTotal * 1.5}em`,
      };
    },
    numbersWrapperStyle: function() {
      return {
        transform: `translateY(${this.itemCurrent * 1.5}em)`,
      };
    },
    lineBeforeStyle: function() {
      return {
        height: `${this.itemCurrent * 1.5}em`,
      };
    },
    lineAfterStyle: function() {
      return {
        top: `${(this.itemCurrent + 1) * 1.5}em`,
        height: `${(this.itemsTotal - 1 - this.itemCurrent) * 1.5}em`,
      };
    },
    isDarkBackground() {
      return this.$store.state.layout.isDarkBackground;
    },
  },
  mounted() {
    const targets = this.$el;
    this.$anime({
      targets,
      translateX: -100,
      opacity: 0,
      easing: "easeInQuart",
      direction: "reverse",
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";

.scroll-progress {
  will-change: opacity, transform;
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: 0 $space-3;
  z-index: $zIndexScrollProgress;
  font-size: $fontSize5;
  font-weight: $fontWeightThin;
  pointer-events: none;
  .progress-line {
    will-change: height, top;
    position: absolute;
    top: 0;
    right: calc(#{$space-3} + 0.34em);
    width: 1px;
    background-color: $colorBlack;
    transition: 1s cubic-bezier(1, 0.2, 0.2, 1);
  }
  .numbers-wrapper {
    will-change: transform;
    color: $colorBlack;
    font-weight: $fontWeightLight;
    transition: 1s cubic-bezier(1, 0.2, 0.2, 1);
    .numbers {
      display: inline-block;
      .numbers-prev,
      .numbers-next {
        width: 1.2em;
        transition: opacity 0s;
      }

      .numbers-prev {
        opacity: 1;
      }
      .numbers-next {
        transform: translateY(-1.5em);
        opacity: 0;
      }
      &.is-animate {
        .numbers-prev,
        .numbers-next {
          transition: opacity 1s cubic-bezier(1, 0.2, 0.2, 1);
        }
        .numbers-prev {
          opacity: 0;
        }
        .numbers-next {
          opacity: 1;
        }
      }
    }
  }
  &.is-white {
    .progress-line {
      background-color: $colorWhite;
    }
    .numbers-wrapper {
      color: $colorWhite;
    }
  }
}
</style>
