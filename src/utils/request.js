import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// request 拦截器
service.interceptors.request.use(config => {
  // Do nothing before request is send
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// response 拦截器
service.interceptors.response.use(response => response, error => {
  console.log('err' + error); //for debug
  if (error  && error.response) {
    switch (error.response.status) {
      case 400:  //POST/PUT数据时候，数据属性中有错误格式的数据
        break;
      case 401:  //未授权错误，需要重新登录，引导到登录页面去
        location.replace("/#/login");
        break;
      case 403:  //拒绝访问
        break;
      case 404:  //找不到对象
        break;
      case 408:  //请求超时
        break;
      case 500:  //服务器错误
        break;
      case 501:  //服务未实现
        break;
      case 502:  //网络错误
        break;
      case 503:  //服务未实现
        break;
      case 504:  //网络超时
        break;
      case 505:  //HTTP版本不受支持
        break;
      default: this.$message.error(error.message);
    }
  }
  return Promise.reject(error);
})

export default service