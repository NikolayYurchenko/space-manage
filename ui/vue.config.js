const path = require('path')

module.exports = {
    devServer: {
        proxy: 'http://localhost:8090'
    },
    configureWebpack: {
      optimization: {
        splitChunks: false
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src/'),
          'assets': path.resolve(__dirname, './src/assets'),
          'images': path.resolve(__dirname, './src/assets/images'),
          'components': path.resolve(__dirname, './src/components'),
          'utils': path.resolve(__dirname, './src/utils')
        }
      },
    },
    chainWebpack: config => {
        config.module.rules.delete('svg')
        config.module
          .rule('images')
          .test(/\.(png|jpe?g|gif|svg|webp)(\?.*)?$/)
          .use('url-loader')
          .loader('url-loader')
          .tap(options => Object.assign(options, { limit: 1048576 }))
        config
          .plugin('define')
          .tap(args => {
            let v = JSON.stringify(require('./package.json').version)
            args[0]['process.env']['VERSION'] = v
            let b = JSON.stringify(process.env.BUILD_NUM)
            args[0]['process.env']['BUILD_NUM'] = b
            return args
          })
      },
    
}