<template>
  <full-page-template :anchors="anchors">
    <about-section
      :heading="about.heading"
      :headlines="about.description"
      :imageURL="about.imageURL"
      :videoURL="about.videoURL"
      :anchor="anchors[0]"
      :links="connects.map(({ title, slug }) => ({ title, slug }))"
      :id="$mq !== 'desktop' && anchors[0]"
    ></about-section>
    <contact-section
      :heading="contact.heading"
      :subHeadlines="contact.subheading"
      :headlines="contact.headlines"
      :links="connects.map(({ title, slug }) => ({ title, slug }))"
      :anchor="anchors[1]"
      :id="$mq !== 'desktop' && anchors[1]"
    ></contact-section>
  </full-page-template>
</template>

<script>
import AboutSection from "../components/LandingPage/AboutSection.vue";
import ContactSection from "../components/AboutPage/ContactSection.vue";
import FullPageTemplate from "../components/Layout/FullPageTemplate.vue";

export default {
  components: {
    AboutSection,
    FullPageTemplate,
    ContactSection,
  },
  async asyncData({ params, $axios }) {
    const anchors = ["about", "contact"];
    
    let response = await $axios.$get(`pages?slug=about`);
    let content = response[0].content.rendered.match(/<(.)>.*?<\/\1>/g);

    let AboutData = {
      heading: response[0].title.rendered,
      imageURL:response[0].acf.video.poster.url,
      videoURL:response[0].acf.video.url.url,
      description: content.map((value, index) => value.replace(/<\/?[^>]+(>|$)/g, '')),
    };

    response = await $axios.$get(`pages?slug=home`);

    let connectData = [];
    connectData.push(response[0].acf.connection1);
    connectData.push(response[0].acf.connection2);
    connectData.push(response[0].acf.connection3);
    connectData.push(response[0].acf.connection4);
    connectData.push(response[0].acf.connection5);

    response = await $axios.$get(`pages?slug=contact`);
    content = response[0].content.rendered.match(/<(.)>.*?<\/\1>/g);

    let ContactData = {
      heading: response[0].title.rendered,
      subheading: response[0].acf.subheadtitle,
      headlines: content.map((value, index) => value.replace(/<\/?[^>]+(>|$)/g, "")),
    };
    
    return {
      about: AboutData,
      contact: ContactData,
      connects: connectData,
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
