const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/dist/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/sass/all.scss";`
      }
    }
  }
})
