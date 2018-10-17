<template>
	    <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" v-if="title" @click="()=> collapsed = !collapsed" />
                <span style="color: #000;font-size: 16px" v-if="title">{{title}}</span>
                <div class="header-navbar">
                <a-badge :count="count" class="header-navbar-item-icon" >
                    <a-icon type="bell" />
                </a-badge>
                <a-dropdown class="header-navbar-item">
                    <span>
                    <a-avatar class="avatar" size="small" shape="circle" :src="user.avatar" style="vertical-align: middle; margin-right: 0.5em;" />
                    <span>{{user.nickname}}</span>
                    </span>
                    <a-menu style="width: 150px" slot="overlay" @click="loginOut">
                    <a-menu-item key="1">
                        <a-icon type="user" />
                        <span>个人中心</span>
                    </a-menu-item>
                    <a-menu-item key="2">
                        <a-icon type="setting" />
                        <span>设置</span>
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="3" >
                        <!-- <router-link to=""> -->
                        <a-icon type="poweroff" />
                        <span>退出登录</span>
                        <!-- </router-link> -->
                    </a-menu-item>
                    </a-menu>
                </a-dropdown>
                </div>
            </a-layout-header>
            <a-layout-content>
                <transition name="page-toggle">
                    <router-view ref="page" />
                </transition>
            </a-layout-content>
        </a-layout>
	
</template>
<script type="text/ecmascript-6">
import { handlerError } from 'api/catch';
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            collapsed: false,
        }
    },
	props: {
        user: {
            type: Object,
            default() {
                return {
                    'nickname': '系统管理员默认',
                    'avatar': 'http://st.ddpei.cn/hv/avatar/2wJfH4mR6TCFKyd5DwsWXK.jpg?x-oss-process=style/avatar120png'
                }
            }
        },
        count: {
            type: Number,
            default: 0
        },
        title: {
            type: String,
            default: ''
        }
    },
    methods: {
        loginOut({ item, key, keyPath }) {
            if(key != 3) return;
            this.$axios.post('/api/user/signout').then(res => {
                this.setLoginOut()
                this.$router.push('/login')
            }).catch(err => {
                handlerError(err.response.data)
            })
        },
        ...mapMutations({
            setLoginOut: 'SET_LOGOUT'
        })
    }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";


</style>