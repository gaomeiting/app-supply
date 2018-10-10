const path = require('path')
const resolve = dir => {return path.join(__dirname, dir)}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_conf', resolve('config'))
  },
  productionSourceMap: false,
  devServer: {
    proxy: 'http://192.168.100.37:8080'
  }
}
