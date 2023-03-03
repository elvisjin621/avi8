<template>
  <div :id="id" class="particles-background"></div>
</template>

<script>
export default {
  name: "ParticlesBackground",
  props: {
    color: {
      type: String,
      default: "#fec010",
    },
    opacity: {
      type: Number,
      default: 0.5,
    },
  },
  data() {
    return {
      id: `particles-${Math.floor(Math.random() * 5000)}`,
    };
  },
  mounted() {
    require("particles.js");

    this.$nextTick(() => {
      this.initParticleJS();
    });
  },
  methods: {
    initParticleJS() {
      particlesJS(this.id, {
        particles: {
          number: {
            value: 30,
            density: {
              enable: true,
              value_area: 500,
            },
          },
          color: {
            value: this.color,
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: this.color,
            },
            polygon: {
              nb_sides: 3,
            },
            image: {
              src: "img/github.svg",
              width: 100,
              height: 100,
            },
          },
          opacity: {
            value: 0,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 0,
            random: false,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 175,
            color: this.color,
            opacity: this.opacity,
            width: 2,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "window",
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
            onclick: {
              enable: false,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/styles/scss/base";

.particles-background {
  z-index: $zIndexParticlesBackground;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
