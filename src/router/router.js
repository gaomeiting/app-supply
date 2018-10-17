import axios from "axios";
import Vue from "vue";
import Router from "vue-router";
import store from '../store'
import MenuView from '@/layout/MenuView.vue'
import RouteView from '@/layout/RouteView.vue'
import PageView from '@/layout/PageView.vue'
import { handlerError } from 'api/catch';
Vue.use(Router);

const routes = [
    {
      path: "/login",
      name: "login",
      meta: {breadcrumbName: '登录', icon: 'login'},
      component: () => import("@/views/login/login")
    },
    {
      path: "/ongoing",
      name: "ongoing",
      meta: {breadcrumbName: '审核中', icon: 'ongoing'},
      component: () => import("@/views/ongoing/ongoing")
    },
    {
      path: "/code",
      name: "code",
      meta: {breadcrumbName: '公众号', icon: 'code'},
      component: () => import("@/views/code/code")
    },
    {
      path: "/",
      name: "home",
      meta: {breadcrumbName: '首页', icon: 'home', requireAuth: true},
      redirect: "/index",
      component: MenuView,
      children: [
        {
          path: 'index',
          name: 'dashboard',
          meta: {breadcrumbName: '我的工作台', requireAuth: true},
          component: () => import("@/views/dashboard/Index.vue")
        },
        {
          path: '/order',
          name: 'order',
          meta: {breadcrumbName: '订单中心', requireAuth: true},
          component: RouteView,
          children: [
            {
              path: '/order/fast',
              name: 'order_fast',
              meta: {breadcrumbName: '快捷订单', requireAuth: true},
              component: () => import("@/views/order/fast.vue")
            },
            {
              path: '/order/:id',
              name: 'order_fast_detail',
              meta: {breadcrumbName: '快捷订单详情', requireAuth: true},
              component: () => import("@/views/order/fastDetail.vue")
            },
            {
              path: '/order/project',
              name: 'order_project',
              meta: {breadcrumbName: '项目订单', requireAuth: true},
              component: () => import("@/views/order/project.vue")
            },
          ]
        },
        {
          path: '/demands',
          name: 'demands',
          meta: {breadcrumbName: '需求广场', requireAuth: true},
          redirect: '/demands/index',
          component: RouteView,
          children: [
            {
              path: '/demands/index',
              name: 'demands_index',
              meta: {breadcrumbName: '试音需求', requireAuth: true},
              component: () => import('@/views/demands/index.vue')
            },
            {
              path: '/demands/fast',
              name: 'demands_fast',
              meta: {breadcrumbName: '快捷需求', requireAuth: true},
              component: () => import('@/views/demands/fast.vue')
            },
            {
              path: '/demands/project',
              name: 'demands_project',
              meta: {breadcrumbName: '项目需求', requireAuth: true},
              component: () => import('@/views/demands/project.vue')
            },
          ]
        },
        {
          path: '/wallet',
          name: 'wallet',
          meta: {breadcrumbName: '我的钱包', requireAuth: true},
          redirect: '/wallet/index',
          component: RouteView,
          children: [
            {
              path: '/wallet/index',
              name: 'wallet_index',
              meta: {breadcrumbName: '结算中心', requireAuth: true},
              component: () => import('@/views/wallet/index.vue')
            },
            {
              path: '/wallet/withdraw',
              name: 'wallet_withdraw',
              meta: {breadcrumbName: '提现管理', requireAuth: true},
              component: () => import('@/views/wallet/withdraw.vue')
            },
            {
              path: '/wallet/income',
              name: 'wallet_income',
              meta: {breadcrumbName: '收支明细', requireAuth: true},
              component: () => import('@/views/wallet/income.vue')
            },
          ]
        },
        {
          path: '/setting',
          name: 'setting',
          meta: {breadcrumbName: '账号设置', requireAuth: true},
          redirect: '/setting/user',
          component: RouteView,
          children: [
            {
              path: '/setting/user',
              name: 'setting_user',
              meta: {breadcrumbName: '个人信息', requireAuth: true},
              component: () => import('@/views/setting/user.vue')
            },
            {
              path: '/setting/safety',
              name: 'setting_safety',
              meta: {breadcrumbName: '账户安全', requireAuth: true},
              component: () => import('@/views/setting/safety.vue')
            },
          ]
        },
      ]
    },
    {
      path: "/news",
      name: "news",
      meta: {breadcrumbName: '消息中心', icon: 'news', requireAuth: true},
      component: () => import('@/views/news/news.vue')
    }
]

if (window.localStorage.getItem('user')) {
    let user = JSON.parse(window.localStorage.getItem('user'))
  store.commit('SET_LOGIN', user)
}
const router= new Router({
routes : routes
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(r => r.meta.requireAuth)) {
      if (store.state.user) {
          next();
      }
      else {
        axios('/api/user/userinfo').then(res => {
          //window.alert(res.uid)
          store.commit('SET_LOGIN', res.data);
          next();
        }).catch(err => {
          handlerError(err.response.data)
        })
      }
  }
  else {
      next();
  }
});
export default router
