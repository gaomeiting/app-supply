<template>
    <a-menu theme="dark" mode="inline" :selectedKeys="selectedMenuItem" :defaultOpenKeys="openedSubMenu">
      <a-menu-item key="dashboard">
        <router-link to="/index">
          <a-icon type="dashboard" />
          <span>我的工作台</span>
        </router-link>
      </a-menu-item>
      <a-sub-menu key="order">
          <span slot="title">
            <a-icon type="solution" />
            <span>订单中心</span>
          </span>
        <a-menu-item key="order_fast">
          <router-link to="/order/fast">快捷订单</router-link>
        </a-menu-item>
        <a-menu-item key="order_project">
          <router-link :to="{ name: 'order_project'}">项目订单</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="demands">
          <span slot="title">
            <a-icon type="team" />
            <span>需求广场</span>
          </span>
        <a-menu-item key="demands_index">
          <router-link to="/demands/index">试音需求</router-link>
        </a-menu-item>
        <a-menu-item key="demands_fast">
          <router-link to="/demands/fast">快捷需求</router-link>
        </a-menu-item>
        <a-menu-item key="demands_project">
          <router-link to="/demands/project">项目需求</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="wallet">
          <span slot="title">
            <a-icon type="hourglass" />
            <span>我的钱包</span>
          </span>
        <a-menu-item key="wallet_index">
          <router-link to="/wallet/index">结算中心</router-link>
        </a-menu-item>
        <a-menu-item key="wallet_withdraw">
          <router-link to="/wallet/withdraw">提现管理</router-link>
        </a-menu-item>
        <a-menu-item key="wallet_income">
          <router-link to="/wallet/income">收支明细</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="setting">
          <span slot="title">
            <a-icon type="appstore-o" />
            <span>账号设置</span>
          </span>
        <a-menu-item key="setting_user">
          <router-link to="/setting/user">个人信息</router-link>
        </a-menu-item>
        <a-menu-item key="setting_safety">
          <router-link to="/setting/safety">账户安全</router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
</template>

<script>
  export default {
    data () {
      return {
        selectedMenuItem: ['dashboard'],
        openedSubMenu: []
      }
    },
    watch: {
      '$route' () {
        this.getCurrentMenuItem()
      }
    },
    created() {this.getCurrentMenuItem()},
    methods: {
      getCurrentMenuItem() {
        if (this.$route.name === 'dashboard') {
          this.selectedMenuItem  = ['dashboard']
          this.openedSubMenu = []
        } else {
          const routeNameArray = this.$route.name.split('_', 3)
          this.selectedMenuItem.splice(0, 1, routeNameArray[0] + '_' + routeNameArray[1])
          this.openedSubMenu = [ routeNameArray[0] ]
        }
      }
    }
  }

</script>
