import Vue from "vue";
import Router from "vue-router";
import MenuView from '@/layout/MenuView.vue'
import RouteView from '@/layout/RouteView.vue'
import PageView from '@/layout/PageView.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/login")
    },
    {
      path: "/",
      name: "home",
      meta: {breadcrumbName: '首页', icon: 'home'},
      redirect: "/index",
      component: MenuView,
      children: [
        {
          path: 'index',
          name: 'dashboard',
          meta: {breadcrumbName: '我的工作台'},
          component: () => import("@/views/dashboard/Index.vue")
        },
        {
          path: '/order',
          name: 'order',
          meta: {breadcrumbName: '订单中心'},
          component: RouteView,
          children: [
            {
              path: '/order/fast',
              name: 'order_fast',
              meta: {breadcrumbName: '快捷订单'},
              component: () => import("@/views/order/fast.vue")
            },
            {
              path: '/order/project',
              name: 'order_project',
              meta: {breadcrumbName: '项目订单'},
              component: () => import("@/views/order/project.vue")
            },
          ]
        },
        {
          path: '/demands',
          name: 'demands',
          meta: {breadcrumbName: '需求广场'},
          redirect: '/demands/index',
          component: RouteView,
          children: [
            {
              path: '/demands/index',
              name: 'demands_index',
              meta: {breadcrumbName: '试音需求'},
              component: () => import('@/views/demands/index.vue')
            },
            {
              path: '/demands/fast',
              name: 'demands_fast',
              meta: {breadcrumbName: '快捷需求'},
              component: () => import('@/views/demands/fast.vue')
            },
            {
              path: '/demands/project',
              name: 'demands_project',
              meta: {breadcrumbName: '项目需求'},
              component: () => import('@/views/demands/project.vue')
            },
          ]
        },
        {
          path: '/wallet',
          name: 'wallet',
          meta: {breadcrumbName: '我的钱包'},
          redirect: '/wallet/index',
          component: RouteView,
          children: [
            {
              path: '/wallet/index',
              name: 'wallet_index',
              meta: {breadcrumbName: '结算中心'},
              component: () => import('@/views/wallet/index.vue')
            },
            {
              path: '/wallet/withdraw',
              name: 'wallet_withdraw',
              meta: {breadcrumbName: '提现管理'},
              component: () => import('@/views/wallet/withdraw.vue')
            },
            {
              path: '/wallet/income',
              name: 'wallet_income',
              meta: {breadcrumbName: '收支明细'},
              component: () => import('@/views/wallet/income.vue')
            },
          ]
        },
        {
          path: '/setting',
          name: 'setting',
          meta: {breadcrumbName: '账号设置'},
          redirect: '/setting/user',
          component: RouteView,
          children: [
            {
              path: '/setting/user',
              name: 'setting_user',
              meta: {breadcrumbName: '个人信息'},
              component: () => import('@/views/setting/user.vue')
            },
            {
              path: '/setting/safety',
              name: 'setting_safety',
              meta: {breadcrumbName: '账户安全'},
              component: () => import('@/views/setting/safety.vue')
            },
          ]
        },
      ]
    }
  ]
});
