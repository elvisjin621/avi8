<template>
  <full-page-template :anchors="anchors">
    <membership-section
      :title="memberships.title"
      :memberships="memberships.memberships"
      :anchor="anchors[0]"
      :id="$mq !== 'desktop' && anchors[0]"
    ></membership-section>
  </full-page-template>
</template>

<script>
import MembershipSection from "../components/MembershipPage/MembershipSection.vue";
import FullPageTemplate from "../components/Layout/FullPageTemplate.vue";

export default {
  components: {
    MembershipSection,
    FullPageTemplate,
  },
  async asyncData({ params , $axios}) {
    const anchors = ["memberships"];

    let response = await $axios.$get(`memberships`);

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let Membershiptemp = [];
    response.map((data)=> {
      Membershiptemp.push({
        title: data.title.rendered,
        price: data.acf.price,
        features: data.content.rendered,
      })
    });

    let MembershipData = {
      title: capitalizeFirstLetter(response[0].type),
      memberships: Membershiptemp,
    };
    return {
      memberships: MembershipData,
      anchors,
    };
  },
  head() {
    return {
      title: "Avi8ted House | About",
    };
  },
  beforeRouteLeave(to, from, next) {
    this.$anime({
      targets: ".page-content",
      opacity: 0,
      duration: 500,
      easing: "easeOutQuart",
    });
    setTimeout(() => {
      next();
    }, 500);
  },
};
</script>
