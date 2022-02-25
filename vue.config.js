module.exports = {
  outputDir: "dist",
  // devServer: {
  //   "public": "dev.globalclub.consulting",
  //   proxy: {
  //     "/api/": {
  //       target: process.env.VUE_APP_BASE_URL,
  //       logLevel: "debug",
  //     }
  //   }
  // },
  css: {
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },
      sass: {
        // options here will be passed to postcss-loader
      }
    }
  },
/*  pluginOptions: {
    i18n: {
      runtimeOnly: false,
    },
  },*/
};
