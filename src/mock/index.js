import Mock from 'mockjs'
import loginApi from './login'

// 登录相关
Mock.mock(/\/api\/user\/login/, 'post', loginApi.loginByUsername)
Mock.mock(/\/api\/user\/logout/, 'post', loginApi.logout)
Mock.mock(/\/api\/user\/info/, 'get', loginApi.getUserInfo)

export default Mock