module.exports = {
  /*
   ** Headers of the page
   */
  target: "server",
  head: {
    title: "Avi8ted House",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      },
      { hid: "description", name: "description", content: "" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        size: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        size: "16x16",
        href: "/favicon-16x16.png",
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: [
    "~assets/styles/normalize.css",
    "cookieconsent/build/cookieconsent.min.css",
    { src: "~assets/styles/styles.scss", lang: "scss" },
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/fullpage.js", ssr: false },
    { src: "~/plugins/vdragged.js" },
    { src: "~/plugins/anime.js" },
    { src: "~/plugins/veevalidate.js" },
    { src: "~/plugins/waypoint.js", ssr: false },
    { src: "~/plugins/mediaQueries.js" },
    { src: "~/plugins/globalComponents.js" },
  ],

  publicRuntimeConfig: {
    axios: {
      baseUrl: 'http://3.134.90.164/wordpress/wp-json/wp/v2'
    },
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    [
      "@nuxtjs/google-fonts",
      {
        googleFonts: {
          families: {
            Inter: [100, 300, 400, 500, 700],
          },
        },
      },
    ],
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-142978290-1",
      },
    ],
    "portal-vue/nuxt",
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */

    // vendor: ["vanilla-tilt", "particles.js", "anime.js"],

    extend(config, ctx) {},
  },
};
