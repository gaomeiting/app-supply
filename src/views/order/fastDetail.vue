<template>
  <div class="fast_detail">
    <div class="title">
      <span class="title_title">标题：</span>
      <span class="title_name">{{orderMessage.title}}</span>
    </div>
    <div class="ask">
      <span class="ask_title">要求：</span>
      <div class="ask_list">
        <span class="each_ask" v-if="orderMessage.requiredGender == 0">不限</span>
        <span class="each_ask" v-if="orderMessage.requiredGender == 1">男</span>
        <span class="each_ask" v-if="orderMessage.requiredGender == 0">女</span>
        <span class="each_ask">{{voiceStyle}}</span>
        <span class="each_ask" v-if="orderMessage.voiceSpeed == 1">标准</span>
        <span class="each_ask" v-if="orderMessage.voiceSpeed == 0">慢速</span>
        <span class="each_ask" v-if="orderMessage.voiceSpeed == 2">快速</span>
        <span class="each_ask" v-if="orderMessage.requirementTitle == 0">读标题</span>
        <span class="each_ask" v-if="orderMessage.requirementTitle == 1">不读标题</span>
      </div>
    </div>
    <div class="text">
      <span class="text_title">文稿：</span>
      <span class="text_text" v-show="!isAllText">{{text}}<span class="click_all" @click="showAllText">查看全部 >></span></span>
      <span class="text_text" v-show="isAllText">{{allText}}<span class="click_all" @click="showShortText">收起 >></span></span>
    </div>
    <p class="demands_title"><span class="color">&nbsp;</span>交付记录</p>
    <div class="demands_list">
      <!--<a @click="toDemands(orderMessage.demandId)" style="width: 100%;display: block;text-align: right">查看试音详情</a>-->
      <a-list itemLayout="horizontal"
              :dataSource="deliveryList">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <div class="list_item">
            <div class="header">
              <a-avatar slot="avatar"
                        class="avatar"
                        :src="item.avatar"/>
              <div class="message">
                <p slot="title" class="mess_title">{{item.title}}</p>
                <p class="time">{{item.creatTime}}</p>
              </div>
            </div>
            <div class="middle">
              <p class="text">上传了音频</p>
              <div class="icons">
                <div class="icon play" @click="toPlay(index)">
                  <div class="play_icon">
                    <a-icon type="play-circle-o" class="icon_icon click_play" style="display: block" />
                    <a-icon type="pause-circle-o" class="icon_icon click_pause" style="display: none" />
                  </div>
                  <span class="icon_text">试听</span>
                </div>
                <div class="icon" @click="downLoad(item.voiceUrl)">
                  <a-icon type="download" class="icon_icon" />
                  <span class="icon_text">下载</span>
                </div>
                <!--满意初始状态-->
                <div class="icon" @click="toWell(item.status)" v-if="item.status == 0 || item.status == 1">
                  <a-icon type="like-o" class="icon_icon" />
                  <a-modal
                    title="是否确定订单已经完成？"
                    v-model="visible"
                    :maskStyle="maskStyle"
                    @ok="hideModal(item.id)"
                    okText="确认"
                    cancelText="取消">
                    <div>
                      结算金额：
                      <a-input-number v-model="settleNum"/>
                      元
                    </div>
                  </a-modal>
                  <span class="icon_text">满意</span>
                </div>
                <!--满意选中状态-->
                <div class="icon" v-if="item.status == 2">
                  <a-icon type="like-o" class="icon_icon" style="color: #52c41a;" />
                  <span class="icon_text" style="color: #52c41a;">满意</span>
                </div>
                <!--不满意初始状态-->
                <div class="icon" v-if="item.status == 0 || item.status == 2" @click="noWell">
                  <a-icon type="dislike-o" class="icon_icon" />
                  <a-modal
                    title="意见反馈"
                    v-model="visibleNo"
                    :maskStyle="maskStyle"
                    @ok="sureOpinion(item.id)"
                    okText="确认"
                    cancelText="取消">
                    <div>
                      <a-input v-model="opinion" placeholder="请输入对该音频不满意的理由，将会发送给相关配音员"/>
                    </div>
                  </a-modal>
                  <span class="icon_text">不满意</span>
                </div>
                <!--不满意选中状态-->
                <div class="icon" v-if="item.status == 1">
                  <a-icon type="dislike-o" class="icon_icon" style="color: red;" />
                  <span class="icon_text" style="color: red;">不满意</span>
                </div>
              </div>
            </div>
            <div class="content" v-if="item.status != 0">
              <a-icon type="caret-up" class="up_icon" />
              <div class="header">
                <a-avatar slot="avatar"
                          class="avatar"
                          src="http://st.ddpei.cn/avatar/BhTrDkWK6TvikB8jZvnRXj.png" />
                <div class="message">
                  <p slot="title" class="header_mes_title">叮当配</p>
                  <p class="time">{{item.replayTime}}</p>
                </div>
              </div>
              <p class="opinion">{{item.replay}}</p>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </div>
    <div class="updata">
      <a-upload name="file"
                :beforeUpload="beforeUpload"
                :showUploadList="isSuccse"
                @change="handleChange"
                action="//jsonplaceholder.typicode.com/posts/">
        <p>上传音频</p>
      </a-upload>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data(){
      return{
        orderMessage:{},
        deliveryList:[],
        visible:false,
        visibleNo:false,
        settleNum:null,
        maskStyle:{
          background:'rgba(0,0,0,0.4)'
        },
        opinion:'',
        isAllText:false,
        isSuccse:false,
        text:'',
        voiceStyle:'',
        allText:''
      }
    },
    methods:{
      showAllText(){
        this.isAllText = true
      },
      showShortText(){
        this.isAllText = false
      },
      beforeUpload(file,promise){
        const upType = file.type === 'audio/mp3'
        console.log(promise)
        if(!upType){
          this.$message.error('请选择性别')
        }else{
          this.isSuccse = true
        }
      },
      handleChange(file){
        console.log(file)
      },
      hideModal(){},
      toDemands(){},
      toPlay(){},
      downLoad(){},
      toWell(){},
      noWell(){},

    },

    mounted(){
      axios.get('api/order/'+this.$route.params.id+'/detail').then(res => {
        this.orderMessage = res.data
        this.voiceStyle = this.orderMessage.voiceStyle.toString()
        console.log(this.orderMessage)
        var text = this.orderMessage.content
        this.allText = text
        let textNum = text.length
        if(textNum >= 100){
          this.text = text.substring(0,150) + '...'
        }else{
          this.text = text
        }
      }).catch(err => {
        const errorStatus = err.response.status
        if(errorStatus == '401'){
          this.$router.replace('/login')
        }
        if(errorStatus == '500'){
          this.error = 1
        }
      })
      axios.get('api/order/'+this.$route.params.id+'/delivery').then(res => {
        this.deliveryList = res.data
      }).catch(err => {
        const errorStatus = err.response.status
        if(errorStatus == '401'){
          this.$router.replace('/login')
        }
        if(errorStatus == '500'){
          this.error = 1
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  p{
    margin-bottom: 0px;
  }
  .fast_detail{
    background: #ffffff;
    margin: 20px;
    border-radius: 4px;
    padding: 40px 20px;
    .title{
      margin-bottom: 40px;
      .title_title{
        width: 50px;
      }
      .title_name{
        font-size: 22px;
        color: #222222
      }
    }
    .ask{
      display: flex;
      margin-bottom: 40px;
      .ask_title{
        width: 50px;
      }
      .ask_list{
        .each_ask{
          background: #eaeaea;
          margin-right: 10px;
          border-radius: 16px;
          padding: 5px 10px;
          font-size: 12px;
        }
      }
    }
    .text{
      display: flex;
      margin-bottom: 50px;
      .text_title{
        width: 50px;
      }
      .text_text{
        width: 85%;
        color: #222222;
        letter-spacing:1px;
        line-height: 18px;
        .click_all{
          color: #4a1d05;
          font-weight: bold;
          text-decoration:underline;
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
    .demands_title{
      font-size: 20px;
      color: #222222;
      .color{
        background: #ffd101;
        margin-right: 10px;
      }
    }
    .demands_list{
      .list_item{
        width: 100%;
        .header{
          height: 60px;
          display: flex;
          .avatar{
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          .message{
            height: 60px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 15px;
            .mess_title{
              margin-top: 10px;
            }
            .time{
              font-size: 12px;
              color: #aeaeae;
              margin-bottom: 8px;
            }
          }
        }
        .middle{
          height: 28px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding-left: 65px;
          .icons{
            width: 45%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .play{
              display: flex;
              align-items: center;
            }
            .icon{
              .icon_icon{
                margin-right: 10px;
              }
              &:hover{
                cursor: pointer;
              }
            }
          }
        }
        .content{
          padding: 10px;
          margin-left: 65px;
          background: #f2f2f2;
          position: relative;
          min-height: 85px;
          margin-top: 10px;
          border-radius: 4px;
          .up_icon{
            position: absolute;
            top: -8px;
            left: 25px;
            color: #f2f2f2;
          }
          .header{
            height: 50px;
            display: flex;
            .avatar{
              width: 40px;
              height: 40px;
            }
            .message{
              height: 50px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              margin-left: 15px;
              .header_mes_title{
                margin-top: 3px;
              }
              .time{
                font-size: 12px;
                color: #aeaeae;
                margin-bottom: 8px;
              }
            }
          }
          .opinion{
            margin-left: 55px;
            margin-top: 5px;
          }
        }
      }
    }
  }
</style>
