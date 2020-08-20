const path = require('path')
const webpack = require('webpack')
const createThemeColorReplacerPlugin = require('./src/config/plugin.config')
const globalConfig = require('./src/config/index')
const CompressionWebpackPlugin = require('compression-webpack-plugin') // gzip压缩
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i // gzip匹配文件规则

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    moment: 'moment',
  },
  css: [],
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
    '//cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js',
  ],
}

const vueConfig = {
  productionSourceMap: false,
  lintOnSave: true,
  // 打包输出文件夹名字
  publicPath: './',
  // 打包输出文件夹名字
  outputDir: process.env.VUE_APP_OUTPUTDIR, // 根据环境去打包
  configureWebpack: {
    plugins: [
      // 忽略/moment/locale下的所有文件
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    externals: isProd ? assetsCDN.externals : {},
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 注入全局样式
      patterns: [path.resolve(__dirname, 'src/style/utils.less')],
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@$', resolve('src')).set('@ant-design/icons/lib/dist$', resolve('src/config/icons.js'))
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
      })

    // 正式环境张注入CDN
    if (isProd) {
      config.plugin('html').tap((args) => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 通过修改默认ant主题的less变量实现自定义主题
            // 'primary-color': 'red',
            // 'link-color': 'red',
            // 'border-radius-base': '0px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  devServer: {
    port: 8000,
    // 如果您想启用代理，请删除 mockjs /src/main.jsL11
    // proxy: {
    //   '/api': {
    //     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
    //     ws: false,
    //     changeOrigin: true
    //   }
    // }
  },
}

if (globalConfig.prodShowSettingDrawer || process.env.NODE_ENV !== 'production') {
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

if (isProd) {
  vueConfig.configureWebpack.plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: productionGzipExtensions,
      threshold: 10240, // 只处理比这个值大的资源，按字节计算
      minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
      deleteOriginalAssets: false, // 是否删除原始资源 默认false
    })
  )
}

module.exports = vueConfig
