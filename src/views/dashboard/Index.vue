<template>
  <div>
    <Exception v-if="error == 1"></Exception>
    <div class="dashboard" v-if="error == 0">
      <div class="header">
        <div class="header_left">
          <img :src="dashboardMes.avatar" class="avatar" alt="姓名">
          <div class="header_message">
            <div class="message_people">
              <h2 class="name">{{dashboardMes.nickname}}</h2>
              <img v-if="dashboardMes.dubberLevel == 0" class="level_icon" src="@/assets/level0.png" alt="">
              <img v-if="dashboardMes.dubberLevel == 1" class="level_icon" src="@/assets/level1.png" alt="">
              <img v-if="dashboardMes.dubberLevel == 2" class="level_icon" src="@/assets/level2.png" alt="">
            </div>
            <span class="intro">{{dashboardMes.slogan}}</span>
          </div>
        </div>
        <div class="header_right">
          <span class="right_text">将要入账：</span>
          <span class="right_icon">￥</span>
          <span class="right_number">{{dashboardMes.incomeFrom}}~{{dashboardMes.incomeTo}}</span>
        </div>
      </div>
      <div class="content">
        <div class="numbers">
          <p class="text">已入账（元）</p>
          <p class="number">{{dashboardMes.income}}</p>
        </div>
        <div class="numbers">
          <p class="text">进行中（订单）</p>
          <p class="number">{{dashboardMes.doingOrder}}</p>
        </div>
        <div class="numbers">
          <p class="text">已试音</p>
          <p class="number">{{dashboardMes.bidCount}}</p>
        </div>
        <div class="numbers">
          <p class="text">已中标</p>
          <p class="number">{{dashboardMes.winBidCount}}</p>
        </div>
      </div>
      <div class="banner">
        <img class="banner_img" src="@/assets/banner.jpg" alt="">
      </div>

    </div>
  </div>

</template>

<script>
import ACard from 'ant-design-vue/lib/card'
import PageLayout from '@/layout/PageLayout'
import axios from 'axios'
import Exception from '../exception/500'

export default {
  data(){
    return{
      error:0,
      name: "我的工作台",
      dashboardMes:{},
    }
  },
  components: {ACard, PageLayout, Exception},
  computed: {
      currentUser () {
          return {
              'nickname': '系统管理员',
              'avatar': 'http://st.ddpei.cn/hv/avatar/2wJfH4mR6TCFKyd5DwsWXK.jpg?x-oss-process=style/avatar120png'
          }
      }
  },
  mounted(){
    axios.get('/api/user/workPlatformInfo').then(res => {
      this.dashboardMes = res.data
    }).catch(err => {
      const errorStatus = err.response.status
      if(errorStatus == '500'){
        this.error = 1
      }else{
        handlerError(err.response.data)
      }
    })
  },
}
</script>
<style lang="scss" scoped>
  .header{
    padding: 30px 80px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    .header_left{
      display: flex;
      align-items: flex-end;
      .avatar{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid #f2f2f2;
        margin-right: 20px;
      }
      .header_message{
        height: 100%;
        display:flex;
        flex-direction: column;
        justify-content: space-around;
        .message_people{
          display: flex;
          .level_icon{
            height: 20px;
            margin-top: 3px;
            margin-left: 10px;
          }
        }
      }
    }
    .header_right{
      width: 45%;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      letter-spacing:3px;
      .right_icon{
        font-size: 20px;
        color: #222222;
      }
      .right_number{
        font-size: 52px;
        color: #222222;
        margin-bottom: -4px;
      }
    }
  }
  .content{
    height: 160px;
    margin: 20px;
    display: flex;
    justify-content: space-between;
    .numbers{
      width: 24%;
      background: #ffffff;
      border-radius: 4px;
      box-shadow: #c1c1c1 2px 1px 15px;
      padding: 20px 0;
      .text{
        width: 100%;
        margin-top: 20px;
        text-align: center;
      }
      .number{
        text-align: center;
        font-size: 42px;
        color: #222222;
      }
    }
  }
  .banner{
    margin: 0px 20px;
    .banner_img{
      width: 100%;
      border-radius: 4px;
    }
  }
</style>
