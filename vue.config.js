const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/huadiao_management/" : "/",
  outputDir: 'huadiao_management',
  assetsDir: 'static',
  lintOnSave: false,  // 命名提示关闭
  pages: {
    index: {
      // 主页入口
      entry: './src/pages/index/index.js',
      // 主页
      template: './src/pages/index/index.html',
      // 打包后的html文件名称
      filename: "index.html",
      // 主页标题
      title: '花凋-后台管理系统'
    },
    login: {
      // 登录入口
      entry: './src/pages/login/index.js',
      // 主页
      template: './src/pages/login/index.html',
      // 打包后的html文件名称
      filename: "login.html",
      // 主页标题
      title: '花凋-登录后台管理系统',
    }
  },
  devServer: {
    host: 'localhost',
    port: 8081, // 端口号
    open: true, // 配置自动启动浏览器
    // 开启代理
    proxy: {
      '/huadiao': {
        target: 'http://192.168.0.104:9090',
        changeOrigin: true,
      }
    }
  }
})
