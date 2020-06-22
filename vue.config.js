const path = require('path')
const autoprefixer = require('autoprefixer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const NODE_ENV = process.env.NODE_ENV
const isProduction = () => {
  if (NODE_ENV === 'production') {
    return [
      // 分析包大小
      // new BundleAnalyzerPlugin(),
      // 开启zip 如果服务器有这个配置 可以不需要
      new CompressionWebpackPlugin({
        test: /\.(js|css)$/,
        threshold: 10240,
        deleteOriginalAssets: false
      })
    ]
  } else {
    return []
  }
}
module.exports = {
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  lintOnSave: false,

  // 生产环境去除map
  productionSourceMap: NODE_ENV === 'production' ? false : true,

  publicPath: NODE_ENV === 'production' ? '/earnCoin/' : '/',

  // 配置一下基础配置

  configureWebpack: {
    resolve: {
      alias: {}
    },
    plugins: [
      // 开发环境不执行
      ...isProduction()
    ]
  },

  // css的配置
  css: {
    loaderOptions: {
      postcss: {
        plugins: [autoprefixer()]
      }
    }
  },

  // 开发环配置
  devServer: {
    port: 9922,
    open: true
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [__dirname + '/src/assets/less/*.less']
    }
  }
}
