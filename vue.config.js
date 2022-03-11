const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/vue_training/' : '/',
  // publicPath: process.env.NODE_ENV === 'production' ? '/vue-week6/' : '/',
  // publicPath: process.env.NODE_ENV === 'production' ? '/vue-week7/' : '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/sass/all.scss";`
      }
    }
  }
})
