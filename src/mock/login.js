const userMap = {
    admin: {
        id: 100,
        nickname: '管理员',
        avatar: 'http://st.ddpei.cn/hv/avatar/2wJfH4mR6TCFKyd5DwsWXK.jpg?x-oss-process=style/avatar120png',
        roles:['admin']
    },
    user1: {
        id: 101,
        nickname: '员工1号',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        roles: ['opertor']
    }
}

export default {
    loginByUsername: config => {
        const {username} = JSON.parse(config.body)
        return userMap[username]
    },
    getUserInfo: config => {
        return userMap['admin']
    },
    logout: () => 'success'
}