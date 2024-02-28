const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  pwa: {
    name: "Sketch",
    themeColor: "#00456b",
    appleMobileWebAppCapable: true,
    workboxOptions: {
      // 配置workbox
      skipWaiting: true,
      clientsClaim: true,
      // 强制预缓存所有由webpack生成的资源
      include: [/\.js$/, /\.css$/, /\.html$/, /\.ico$/, /\.jpg$/, /\.png$/, /\.svg$/],
      // 使用缓存优先策略配置runtimeCaching
      runtimeCaching: [
        {
          // 匹配任何请求
          urlPattern: new RegExp('.*'),
          // 应用缓存优先策略
          handler: 'CacheFirst',
          options: {
            // 配置缓存策略
            cacheName: 'cache-all',
            expiration: {
              maxEntries: 100, // 最大条目数
              maxAgeSeconds: 24 * 60 * 60 * 30, // 缓存有效期30天
            },
            cacheableResponse: {
              statuses: [0, 200], // 缓存状态码为0（opaque responses）和200的响应
            },
          },
        },
      ]
    },
    manifestOptions: {
      name: 'Sketch',
      short_name: "Sketch",
      theme_color: "#00456b",
      start_url: ".",
      display: "standalone",
      background_color: "#f6f7f8"
    },
    iconPaths: {
      faviconSVG: './favicon.png',
      favicon32: './favicon.png',
      favicon16: './favicon.png',
      appleTouchIcon: './favicon.png',
      maskIcon: './favicon.png',
      msTileImage: './favicon.png'
    }
  }
})
