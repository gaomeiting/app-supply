<template>
  <a-layout>
    <a-layout-sider :trigger="null"
                    collapsible
                    v-model="collapsed"
                    style="height: 100vh;;position: fixed">
      <div class="logo">
        <img alt="logo" src="@/assets/logo.png">
      </div>
      <SidebarMenu></SidebarMenu>
    </a-layout-sider>
    <a-layout style="margin-left: 200px;min-width: 1200px;min-height: 100vh;padding-bottom: 20px">
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="()=> collapsed = !collapsed" />
        <span style="color: #000;font-size: 16px">{{this.$route.meta.breadcrumbName}}</span>
        <div class="header-navbar">
          <a @click="toMesList">
            <a-badge :count="messageTotal" class="header-navbar-item-icon"  >
              <a-icon type="bell"/>
            </a-badge>
          </a>

          <a-dropdown class="header-navbar-item">
            <span>
              <a-avatar class="avatar" size="small" shape="circle" :src="user.avatar" style="vertical-align: middle; margin-right: 0.5em;" />
              <span>{{user.nickname}}</span>
            </span>
            <a-menu style="width: 150px" slot="overlay">
              <a-menu-item key="1">
                <a-icon type="user" />
                <span>个人中心</span>
              </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="setting" />
                <span>设置</span>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3">
                <a @click="outLogin">
                  <a-icon type="poweroff" />
                  <span>退出登录</span>
                </a>
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
  </a-layout>
</template>

<script>
  import IMenu from './siderMenu'
  import SidebarMenu from '@/components/sidebar/SidebarMenu.vue'
  import GlobalHeader from './GlobalHeader'
  import { handlerError } from 'api/catch';
  import { mapGetters } from 'vuex'
  import { mapMutations } from 'vuex';
  import axios from "axios";
export default {
  props: ['desc', 'logo', 'title', 'avatar'],
  components: {
    IMenu,
    SidebarMenu,
    GlobalHeader
  },
  data () {
    return {
      collapsed: false,
      messageTotal:null,
    }
  },
  created() {
  },
  methods: {
    toMesList(){
      this.$router.push({
        name: 'news',
      })
    },
    outLogin(){
      axios.post('api/user/signout').then(res => {
        this.setLoginOut()
        this.$router.replace('/login')
      }).catch(err => {
        handlerError(err.response.data)
      })
    },
    ...mapMutations({
      setLoginOut: 'SET_LOGOUT'
    })
  },
  computed: {
     ...mapGetters(['user'])
  },
  mounted(){
    axios.get('api/notification/count').then(res => {
      this.messageTotal = res.data
    }).catch(err => {
      const errorStatus = err.response.status
      if(errorStatus == '401'){
        this.$router.replace('/login')

      }
      if(errorStatus == '500'){
        this.error = 1
      }
    })
  },
}
</script>

<style lang="scss">
#app {
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
    :hover {color: #1890ff;}
  }
  .logo {
    height: 64px;
    position: relative;
    line-height: 64px;
    padding-left: 24px;
    -webkit-transition: all .3s;
    transition: all .3s;
    overflow: hidden;
    background: #ffffff;
    box-shadow: #f2f2f2 0.5px 0px 1px 1px;
    img {
      //width: 32px;
      display: inline-block;
      vertical-align: middle;
    }
    h1 {
      color: #fff;
      font-size: 20px;
      margin: 0 0 0 12px;
      font-family: "Myriad Pro","Helvetica Neue",Arial,Helvetica,sans-serif;
      font-weight: 600;
      display: inline-block;
      height: 32px;
      line-height: 32px;
      vertical-align: middle;
    }
  }
  .page-content {
    margin: 24px 16px 0;
  }
  .header-navbar {
    float: right; margin: 0 2em;
    .header-navbar-item-icon{
      font-size: 20px;
      margin-top: 4px;
      padding: 0 1em;
      display: inline-block;
      height: 100%;
      cursor: pointer;
      vertical-align: middle;
    }
    .header-navbar-item {
      padding: 0 1em;
      display: inline-block;
      height: 100%;
      cursor: pointer;
      vertical-align: middle;
    }
  }
}
</style>
