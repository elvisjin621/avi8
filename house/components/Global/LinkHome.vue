<template>
  <a v-if="this.$route.name === 'index'" :href="route">
    <slot></slot>
  </a>
  <nuxt-link v-else :to="`/${route}`">
    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  name: "LinkHome",
  props: {
    anchor: String
  },
  computed: {
    route() {
      return this.$route.name !== "index" && this.anchor === "#home"
        ? ""
        : this.anchor;
    }
  }
};
</script>
