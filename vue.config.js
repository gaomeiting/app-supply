const path = require('path')
const resolve = dir => {return path.join(__dirname, dir)}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('views', resolve('src/views'))
			.set('api', resolve('src/apis'))
      .set('_conf', resolve('config'))
  },
  productionSourceMap: false,
  devServer: {
    proxy: 'http://192.168.100.37:8080'
  },
  configureWebpack: {
    module: {
      rules: [{
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
          options: {
            modifyVars: {
              'primary-color': '#1DA57A',
              'link-color': '#1DA57A',
              'border-radius-base': '2px',
            },
            javascriptEnabled: true,
          },
        }],
      }],
    },
  }
}
