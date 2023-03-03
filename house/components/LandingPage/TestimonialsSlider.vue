<template>
  <div class="testimonials-slider">
    <div class="testimonials-nav">
      <div class="testimonials-nav-title">Testimonials</div>
      <div class="testimonials-nav-divider"></div>
      <div
        v-if="slides.length > 1"
        class="testimonials-nav-link"
        @click="slidePrev"
      >
        <div class="prev"></div>
      </div>
      <div v-if="slides.length > 1" class="testimonials-nav-progress">
        {{ nextSlide + 1 }}/{{ totalSlides }}
      </div>
      <div
        v-if="slides.length > 1"
        class="testimonials-nav-link"
        @click="slideNext"
      >
        <div class="next"></div>
      </div>
    </div>
    <div class="testimonials-slide">
      <div class="testimonials-slide-current">
        <div class="testimonials-text" v-html="slides[currentSlide].text"></div>
        <div class="testimonials-author">
          <div
            class="testimonials-author-name"
            v-if="slides[currentSlide].author"
          >
            {{ slides[currentSlide].author }}
          </div>
          <div class="testimonials-author-company">
            {{ slides[currentSlide].company }}
          </div>
        </div>
      </div>
      <div class="testimonials-slide-prev">
        <div class="testimonials-text" v-html="slides[prevSlide].text"></div>
        <div class="testimonials-author">
          <div class="testimonials-author-name" v-if="slides[prevSlide].author">
            {{ slides[prevSlide].author }}
          </div>
          <div class="testimonials-author-company">
            {{ slides[prevSlide].company }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestimonialsSlider",
  props: {
    slides: Array,
    isAnimateIn: Boolean,
  },
  data() {
    return {
      currentSlide: 0,
      prevSlide: 0,
      nextSlide: 0,
      totalSlides: this.slides.length,
    };
  },
  watch: {
    nextSlide(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.prevSlide = oldValue;
        this.animateOldOut();

        this.animateNewIn();
        setTimeout(() => {
          this.currentSlide = newValue;
        }, 50);
      }
    },
    isAnimateIn(newValue, oldValue) {
      if (newValue) {
        this.animateIn();
      }
    },
  },
  methods: {
    slideNext() {
      let next = this.nextSlide + 1;
      if (next >= this.totalSlides) {
        next -= this.totalSlides;
      }
      this.nextSlide = next;
    },
    slidePrev() {
      let prev = this.nextSlide - 1;
      if (prev <= -1) {
        prev += this.totalSlides;
      }
      this.nextSlide = prev;
    },
    animateOldOut() {
      this.$anime({
        targets: [
          ".testimonials-slider .testimonials-slide-prev .testimonials-text",
          ".testimonials-slider .testimonials-slide-prev .testimonials-author",
        ],
        translateX: 0,
        opacity: 1,
        duration: 0,
      });
      this.$anime({
        targets: [
          ".testimonials-slider .testimonials-slide-prev .testimonials-text",
          ".testimonials-slider .testimonials-slide-prev .testimonials-author",
        ],
        translateX: -100,
        opacity: 0,
        duration: 750,
        easing: "easeOutQuart",
        delay: function(el, i, l) {
          return i * 100 + 0;
        },
        endDelay: function(el, i, l) {
          return (l - i) * 100 + 0;
        },
      });
    },
    animateNewIn() {
      this.$anime({
        targets: [
          ".testimonials-slider .testimonials-slide-current .testimonials-text",
          ".testimonials-slider .testimonials-slide-current .testimonials-author",
        ],
        translateX: 100,
        opacity: 0,
        duration: 0,
      });
      this.$anime({
        targets: [
          ".testimonials-slider .testimonials-slide-current .testimonials-text",
          ".testimonials-slider .testimonials-slide-current .testimonials-author",
        ],
        translateX: 0,
        opacity: 1,
        duration: 1000,
        easing: "easeOutQuart",
        delay: function(el, i, l) {
          return i * 100 + 250;
        },
        endDelay: function(el, i, l) {
          return (l - i) * 100 + 250;
        },
      });
    },
    animateIn() {
      this.$anime({
        targets: [
          ".testimonials-slider .testimonials-slide-current .testimonials-text",
          ".testimonials-slider .testimonials-slide-current .testimonials-author",
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
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";
.testimonials-slider {
  max-width: 750px;
  .testimonials-nav {
    display: flex;
    align-items: center;
    .testimonials-nav-title {
      font-weight: $fontWeightBold;
      text-transform: uppercase;
      letter-spacing: 3px;
    }
    .testimonials-nav-divider {
      display: inline-block;
      flex: 1;
      height: 1px;
      margin: 0 $space-1;
      background-color: rgba($colorBlack, 0.6);
    }
    .testimonials-nav-progress {
      font-size: $fontSize2;
      min-width: 2em;
      text-align: center;
    }
    .testimonials-nav-link {
      text-transform: uppercase;
      font-weight: $fontWeightBold;
      &:hover {
        cursor: url("~assets/images/dot-cursor-16.png") 8 8, auto;
      }
      .prev,
      .next {
        margin: 0 $space-1;
        width: 8px;
        height: 8px;
        display: inline-block;
        border-right: 2px solid $colorBlack;
        border-top: 2px solid $colorBlack;
        transform: rotate(-135deg);
      }
      .next {
        transform: rotate(45deg);
      }
    }
    & > div {
      opacity: 0.6;
      transition: 0.5s opacity;
    }
    div.testimonials-nav-link:hover {
      opacity: 1;
    }
  }
  .testimonials-slide {
    position: relative;
    width: 100%;
    margin-top: $space-2;

    .testimonials-slide-prev {
      position: absolute;
      top: 0;

      .testimonials-text,
      .testimonials-author {
        opacity: 0;
      }
    }
    .testimonials-slide-current,
    .testimonials-slide-prev {
      width: 100%;
      .testimonials-text {
        will-change: opacity, transform;
        font-size: $fontSize11;
        line-height: 1.6;
        font-weight: $fontWeightRegular;
        margin-bottom: $space-2;
      }
      .testimonials-author {
        will-change: opacity, transform;
        font-weight: $fontWeightSemiBold;
        display: flex;
        .testimonials-author-name {
          opacity: 0.6;
          &:after {
            opacity: 0.6;
            content: "•";
            margin: 0 $space-2;
            font-size: $fontSize1;
            font-size: $fontSize16;
            vertical-align: middle;
          }
        }
        .testimonials-author-company {
          opacity: 0.6;
        }
      }
    }
  }
}

@media #{$tablet} {
  .testimonials-slider {
    width: 100%;
    .testimonials-slide {
      .testimonials-slide-current,
      .testimonials-slide-prev {
        .testimonials-text {
          font-size: $fontSize11;
        }
      }
    }
  }
}

@media #{$mobile} {
  .testimonials-slider {
    .testimonials-slide {
      .testimonials-slide-current,
      .testimonials-slide-prev {
        .testimonials-text {
          font-size: $fontSize2;
          font-weight: $fontWeightLight;
          letter-spacing: 1.5px;
        }
      }
    }
  }
}
</style>
