const path = require('path')
const resolve = dir => {return path.join(__dirname, dir)}

module.exports = {
  //baseUrl: './',
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
    proxy: 'http://192.168.100.210'
  },
}
