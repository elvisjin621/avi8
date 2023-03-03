<template>
  <div ref="waypoint" class="waypoint" v-waypoint="{ active: true, callback: onWaypoint }"></div>
</template>

<script>
export default {
  name: "FooterWaypoint",
  methods: {
    onWaypoint({ going, direction }) {
      if (going === "in" && (direction === "top" || direction === "bottom")) {
        this.$store.commit("layout/allowFooter");
      } else if (going === "out" && direction === "bottom") {
        this.$store.commit("layout/hideFooter");
        this.$store.commit("layout/disallowFooter");
      }
    }
  },
  mounted() {
    if (this.$mq === "desktop") {
      this.$nextTick(() => {
        if (this.$refs.waypoint.offsetTop <= window.innerHeight) {
          this.$store.commit("layout/allowFooter");
        } else {
          this.$store.commit("layout/disallowFooter");
        }
      });
    }
  }
};
</script>
