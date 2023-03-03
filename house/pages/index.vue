<template>
  <full-page-template :anchors="anchors">
    <home-section
      :heading="home.heading"
      :headlines="home.headlines"
      :subHeadlines="home.subHeadlines"
      :links="connects.map(({ title, slug }) => ({ title, slug }))"
      :anchor="anchors[0]"
      :id="$mq !== 'desktop' && anchors[0]"
    ></home-section>
    <projects-section
      v-if="projects.length > 0"
      :projects="projects"
      :anchor="anchors[1]"
      :id="$mq !== 'desktop' && anchors[1]"
    ></projects-section>
    <programs-section
      v-for="(program, i) in programs"
      :key="i"
      :imageSrc="program.image"
      :title="program.title"
      :subtitle="program.subtitle"
      :subheading="program.subheading"
      :description="program.description"
      :slug="program.slug"
      :moreLink="program.moreLink"
      :anchor="anchors[projects.length > 0 ? i + 2 : i + 1]"
      :id="$mq !== 'desktop' && anchors[projects.length > 0 ? i + 2 : i + 1]"
      :isFlipped="i % 2 !== 0"
    ></programs-section>
    <testimonials-section
      v-if="testimonials.length > 0"
      :slides="testimonials"
      :anchor="
        anchors[projects.length > 0 ? programs.length + 2 : programs.length + 1]
      "
      :id="
        $mq !== 'desktop' &&
          anchors[
            projects.length > 0 ? programs.length + 2 : programs.length + 1
          ]
      "
    ></testimonials-section>
  </full-page-template>
</template>

<script>
import HomeSection from "../components/LandingPage/HomeSection.vue";
import ProjectsSection from "../components/LandingPage/ProjectsSection.vue";
import ProgramsSection from "../components/LandingPage/ProgramsSection.vue";
import TestimonialsSection from "../components/LandingPage/TestimonialsSection.vue";
import FullPageTemplate from "../components/Layout/FullPageTemplate.vue";
import { isEmpty } from "lodash";

export default {
  components: {
    HomeSection,
    ProgramsSection,
    ProjectsSection,
    TestimonialsSection,
    FullPageTemplate,
  },
  async asyncData({ params, $axios }) {
    let response = await $axios.$get(`pages?slug=home`);
    let content = response[0].content.rendered.match(/<(.)>.*?<\/\1>/g);
    
    let HomeData = {
      heading: response[0].title.rendered,
      subHeadlines: response[0].acf.sub_title,
      headlines: content.map((value, index) => value.replace(/<\/?[^>]+(>|$)/g, ''))
    };

    let connectData = [];
    connectData.push(response[0].acf.connection1);
    connectData.push(response[0].acf.connection2);
    connectData.push(response[0].acf.connection3);
    connectData.push(response[0].acf.connection4);
    connectData.push(response[0].acf.connection5);

    response = await $axios.$get(`projects?_embed`);
    let projectData = [];
    response.map((data, index) => {
      let imageSrc = '';

      let featuredMedia = data?._embedded? data._embedded : '';
      if ( featuredMedia ) {
        if (!isEmpty(featuredMedia['wp:featuredmedia']) && featuredMedia['wp:featuredmedia'].length) {
          imageSrc = featuredMedia['wp:featuredmedia'][0];
          imageSrc = imageSrc?.source_url ? imageSrc.source_url : '';
        }
      }
      

      projectData.push({
        id: index,
        top: parseFloat(data.acf.top),
        left: parseFloat(data.acf.left),
        imageSrc: imageSrc,
        title: data.title.rendered,
        subtitle: data.acf.subtitle,
        location: data.acf.location,
        description: data.content.rendered,
        active: data.acf.active,
      });
    })

    response = await $axios.$get(`programs?_embed`);
    let programData = [];
    response.map((data) => {
      let imageSrc = '';

      let featuredMedia = data?._embedded? data._embedded : '';
      if ( featuredMedia ) {
        if (!isEmpty(featuredMedia['wp:featuredmedia']) && featuredMedia['wp:featuredmedia'].length) {
          imageSrc = featuredMedia['wp:featuredmedia'][0];
          imageSrc = imageSrc?.source_url ? imageSrc.source_url : '';
        }
      }

      programData.push({
        image: imageSrc,
        title: data.title.rendered,
        subtitle: data.acf.subtitle,
        subheading: data.acf.subheading,
        description: data.content.rendered,
        slug: data.slug,
        moreLink: data.acf.more_link,
      })
    })
    
    response = await $axios.$get(`testimonials`);
    let testimonialData = [];
    response.map((data) => {
      testimonialData.push({
        company: data.title.rendered,
        text: data.content.rendered,
      })
    })

    const anchors = [
      "home",
      ...(projectData.length > 0 ? ["projects"] : []),
      ...programData.map(({ slug }) => slug),
      ...(testimonialData.length > 0
        ? ["testimonials"]
        : []),
    ];

    return {
      home: HomeData,
      projects: projectData,
      programs: programData,
      connects: connectData,
      testimonials: testimonialData,
      anchors,
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
