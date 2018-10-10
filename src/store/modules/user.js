import {loginByUsername, logout, getUserInfo} from '@/api/login'

const user = {
    state: {
        uid: 0,
        avatar: '',
        nickname: '',
        roles: []
    }
}

actions: {
    // 用户名登录
    loginByUsername({commit}, userInfo) {
        const username = userInfo.username.trim()
        return new Promise((resolve, reject) => {
            loginByUsername(username, userInfo.password).then(response => {
                const data = response.data
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    }
}