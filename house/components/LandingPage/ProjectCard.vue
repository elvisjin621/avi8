<template>
  <div class="project-card">
    <div v-if="$mq !== 'mobile' || isMore" class="project-image">
      <img :src="project.imageSrc" :alt="project.title" />
      <div v-if="$mq === 'mobile'" class="close-button" @click="hideMore">
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="projects-nav">
      <div
        v-if="projectsTotal > 1"
        class="projects-nav-link"
        @click="projectPrev"
      >
        <div class="prev"></div>
      </div>
      <div v-if="projectsTotal > 1" class="projects-nav-progress">
        {{ projectIndex + 1 }}/{{ projectsTotal }}
      </div>
      <div
        v-if="projectsTotal > 1"
        class="projects-nav-link"
        @click="projectNext"
      >
        <div class="next"></div>
      </div>
      <div class="projects-nav-divider"></div>
    </div>
    <div class="project-content">
      <h2 class="project-title">{{ project.title }}</h2>
      <h3 v-if="project.subtitle" class="project-subtitle">
        {{ project.subtitle }}
      </h3>
      <ul
        v-if="
          ($mq !== 'mobile' || isMore) && Array.isArray(project.description)
        "
        class="project-description"
      >
        <li v-for="(line, i) in project.description" :key="i">{{ line }}</li>
      </ul>
      <div v-if="
          ($mq !== 'mobile' || isMore) && !Array.isArray(project.description)
        "
        class="project-description" v-html="project.description">
      </div >
      <div>
        <div class="project-buttons">
          <membership-link />
          <book-now />
        </div>
        <div class="project-meta">
          <div class="project-meta-name">Location</div>
          <div class="project-meta-divider"></div>
          <div class="project-meta-content">{{ project.location }}</div>
        </div>
        <div class="project-meta" v-if="project.url">
          <div class="project-meta-name">Website</div>
          <div class="project-meta-divider"></div>
          <div class="project-meta-content">
            <a :href="project.url">{{ project.url }}</a>
          </div>
        </div>
      </div>
      <div v-if="$mq === 'mobile'" class="project-more" @click="toggleMore">
        {{ isMore ? "Hide" : "More" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    isAnimateIn: Boolean,
    projectIndex: Number,
    projectsTotal: Number,
    projectPrev: Function,
    projectNext: Function,
    project: {
      id: Number,
      imageSrc: String,
      title: String,
      subtitle: String,
      description: String,
      location: String,
      duration: String,
      lat: Number,
      lon: Number,
    },
  },
  data() {
    return {
      isMore: false,
    };
  },
  watch: {
    project(newValue, oldValue) {
      if (newValue.id !== oldValue.id) {
        this.$nextTick(() => {
          this.animateIn();
        });
      }
    },
    isAnimateIn(newValue, oldValue) {
      if (newValue) {
        setTimeout(() => {
          this.animateIn();
          this.$anime({
            targets: [".project-card .projects-nav"],
            translateX: -100,
            opacity: 0,
            duration: 500,
            direction: "reverse",
            easing: "easeInQuart",
          });
          this.$anime({
            targets: [".project-image img"],
            scale: 1.2,
            duration: 1000,
            direction: "reverse",
            easing: "easeInQuart",
          });
        }, 500);
      }
    },
  },
  methods: {
    toggleMore() {
      this.isMore = !this.isMore;
      this.$nextTick(() => {
        this.animateIn();
      });
    },
    hideMore() {
      this.isMore = false;
      this.$nextTick(() => {
        this.animateIn();
      });
    },
    animateIn() {
      this.$anime({
        targets: [
          ".project-card .project-title",
          ".project-card .project-subtitle",
          ".project-card .project-description",
          ".project-card .project-buttons",
          ".project-card .project-meta",
          ".project-card .project-more",
        ],
        translateX: 0,
        opacity: 1,
        duration: 0,
      });
      this.$anime({
        targets: [
          ".project-card .project-title",
          ".project-card .project-subtitle",
          ".project-card .project-description",
          ".project-card .project-buttons",
          ".project-card .project-meta",
          ".project-card .project-more",
        ],
        translateX: -100,
        opacity: 0,
        duration: 500,
        direction: "reverse",
        easing: "easeInQuart",
        delay: function(el, i, l) {
          return (l - i) * 50;
        },
        endDelay: function(el, i, l) {
          return i * 50;
        },
      });
      this.$anime({
        targets: [".project-image img"],
        scale: 1,
        duration: 0,
        delay: 500,
      });
      this.$anime({
        targets: [".project-image img"],
        scale: 1.2,
        duration: 1000,
        direction: "reverse",
        easing: "easeInQuart",
        endDelay: 500,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";

.project-card {
  background-color: $colorWhite;
  position: relative;
  width: 425px;
  height: 700px;
  display: flex;
  flex-direction: column;
  .close-button {
    position: absolute;
    top: $space-1;
    right: $space-1;
    width: 25px;
    height: 25px;
    div {
      position: absolute;
      height: 100%;
      width: 1px;
      background-color: $colorWhite;
      &:first-of-type {
        left: 7px;
        transform: rotate(-45deg) translateX(7px);
      }
      &:last-of-type {
        left: 17px;
        transform: rotate(45deg) translateX(-7px);
      }
    }
  }
  .project-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 55%;
    overflow: hidden;
    img {
      will-change: transform;
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .projects-nav {
    padding: $space-2 $space-3 0;
    display: flex;
    align-items: center;
    color: $colorBlack;
    .projects-nav-divider {
      display: inline-block;
      flex: 1;
      height: 1px;
      background-color: rgba($colorBlack, 0.6);
    }
    .projects-nav-progress {
      font-size: $fontSize2;
      min-width: 2em;
      text-align: center;
      margin: 0 $space-1;
    }
    .projects-nav-link {
      text-transform: uppercase;
      font-weight: $fontWeightBold;
      &:hover {
        cursor: url("~assets/images/dot-cursor-16.png") 8 8, auto;
      }
      .prev,
      .next {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-right: 2px solid $colorBlack;
        border-top: 2px solid $colorBlack;
        transform: rotate(-135deg);
      }
      .next {
        transform: rotate(45deg);
        margin-right: $space-1;
      }
    }
    & > div {
      opacity: 0.6;
      transition: 0.5s opacity;
    }
    div.projects-nav-link:hover {
      opacity: 1;
    }
  }
  .project-content {
    padding: 0 $space-3 $space-2;
    color: $colorBlack;
    user-select: none;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .project-title {
      will-change: opacity, transform;
      margin-top: $space-1;
      margin-bottom: 0;
    }
    .project-subtitle {
      will-change: opacity, transform;
      font-size: $fontSize3;
      margin-top: $space-05;
      margin-bottom: 0;
    }
    .project-description {
      will-change: opacity, transform;
      padding-left: $space-2;
      margin: 0;
      margin-top: $space-1;
      height: calc(144px + #{$space-2});
      overflow: hidden;
      flex: 1;
      &:before {
        pointer-events: none;
        content: "";
        width: 100%;
        height: $space-3;
        position: absolute;
        left: 0;
        bottom: 0;
        background: linear-gradient(
          to bottom,
          rgba($colorWhite, 0) 0%,
          rgba($colorWhite, 1)
        );
      }
    }
    .project-buttons {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin: $space-1 0;
    }
    .project-meta {
      will-change: opacity, transform;
      display: flex;
      align-items: center;
      color: $colorGray;
      font-weight: $fontWeightSemiBold;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      margin-bottom: calc(#{$space-1} / 2);
      .project-meta-name {
        flex: 0;
        white-space: nowrap;
      }
      .project-meta-divider:after {
        content: "•";
        margin: 0 $space-1;
      }
      .project-meta-content {
        font-weight: $fontWeightLight;
        text-transform: none;
        letter-spacing: 1px;
        overflow: hidden;
        position: relative;
        flex: 1;
        white-space: nowrap;
        &:before {
          pointer-events: none;
          content: "";
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background: linear-gradient(
            to right,
            rgba($colorWhite, 0) 50%,
            rgba($colorWhite, 1)
          );
        }
        a {
          color: $colorDarkGray;
          &:hover {
            cursor: url("~assets/images/dot-cursor-16.png") 8 8, auto;
          }
        }
      }
    }
    .project-more {
      will-change: opacity, transform;
      color: $colorDarkGray;
      font-weight: $fontWeightSemiBold;
      font-size: $fontSize1;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      margin-top: $space-1;
      &:after {
        content: "•";
        margin: $space-1;
      }
    }
  }
}

@media #{$tablet} {
  .project-card {
    max-width: 320px;
    height: 640px;
    .projects-nav {
      padding: $space-2 $space-2 0;
    }
    .project-content {
      padding: $space-1 $space-2 $space-2;
      .project-title {
        font-size: $fontSize4;
        margin-top: 0;
      }
      .project-description {
        height: calc(200px + #{$space-2});
      }
      .project-meta {
        margin-bottom: 0;
      }
    }
  }
}

@media #{$mobile} {
  .project-card {
    height: unset;
    width: 100%;
    max-width: unset;
    .project-content {
      .project-description {
        height: auto;
        margin-bottom: $space-1;
        &:before {
          background: none;
        }
      }
    }
  }
}
</style>
