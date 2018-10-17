<template>
  <div class="fast_detail">
    <a @click="downLoad(orderMessage.id)" >123</a>
    <div class="title">
      <span class="title_title">标题：</span>
      <span class="title_name">{{orderMessage.title}}</span>
      <a :href="'/api/order/export/173120234314399744'" class="dowload">
        <img src="@/assets/export.png" alt="">
        导出文稿与要求
      </a>
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
      <span class="text_text" v-show="!isAllText">{{text}}
        <span class="click_all" v-if="text.length > 150" @click="showAllText">查看全部 >></span>
      </span>
      <span class="text_text" v-show="isAllText">{{allText}}
        <span class="click_all" v-if="text.length > 150 "@click="showShortText">收起 >></span>
      </span>
    </div>
    <p class="demands_title"><span class="color">&nbsp;</span>交付记录</p>
    <div class="demands_list" v-if="orderMessage.voiceStatus == 1">
      <a-list itemLayout="horizontal"
              :dataSource="deliveryList">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <div class="list_item">
            <div class="header">
              <a-avatar slot="avatar"
                        class="avatar"
                        :src="item.avatar"/>
              <div class="message">
                <p slot="title" class="mess_title">{{item.nickname}}</p>
                <p class="time">{{item.creatTime}}</p>
              </div>
            </div>
            <div class="middle">
              <p class="middle_text">上传了音频</p>
              <img src="@/assets/play.png" class="to_play" style="display: block" @click="toPlay(index)">
              <img src="@/assets/pause.png" class="to_pause" style="display: none" @click="toPlay(index)">
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
    <div class="updata" v-if="orderMessage.voiceStatus == 0">
      <a-upload name="file"
                class="updata_input"
                :beforeUpload="beforeUpload"
                :showUploadList="isSuccse"
                @change="handleChange"
                :action="'api/order/'+ orderMessage.id +'/upload'">
        <p class="updata_text">上传音频</p>
      </a-upload>
      <p>(格式限制为mp3格式，大小不超过20M)</p>
    </div>
    <audio :src=currentUrl ref="storyAudio" @ended="ended"></audio>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    inject:['reload'],
    data(){
      return{
        currentUrl:'',
        currentIndex:0,
        orderMessage:{},
        deliveryList:[],
        isPlay:false,
        isUpdataSize:false,
        opinion:'',
        isAllText:false,
        isSuccse:false,
        text:'',
        voiceStyle:'',
        allText:''
      }
    },
    methods:{
      downLoad(id){

        //window.location.href='/api/order/export/'+ id
        axios.get('api/order/export/'+id , {responseType: 'arraybuffer'}).then(res => {
          console.log(res.data)
          excelDown()
        }).catch(err => {
          console.log(err)
        })
      },
      showAllText(){
        this.isAllText = true
      },
      showShortText(){
        this.isAllText = false
      },
      beforeUpload(file){
        const upType = file.type === 'audio/mp3'
        let upSize = file.size
        if(upSize < 5100000){
          this.isUpdataSize = true
        }
        if(!upType){
          this.$message.error('文件上传格式错误，只允许上传mp3格式')
        }else if(!this.isUpdataSize){
          console.log(this.isUpdataSize,'isUpdataSize')
          this.$message.error('文件大小超过上限')
        }
      },
      handleChange(file){
        console.log(file)
        if(file.file.status == 'done'){
          this.reload()
        }
        //console.log(file.fileList[0].response.status)
        //this.reload()
      },
      toPlay(index){
        if(this.currentIndex != index){
          document.getElementsByClassName('to_play')[this.currentIndex].style.display = "block";
          document.getElementsByClassName('to_pause')[this.currentIndex].style.display = "none";
        }
        this.currentIndex = index
        const storyAudioUrl = this.deliveryList[index].voiceUrl
        const storyAudioPlay = this.$refs.storyAudio
        if (storyAudioUrl == this.$refs.storyAudio.src) {
          if(storyAudioPlay.paused){
            storyAudioPlay.play()
            document.getElementsByClassName('to_play')[index].style.display = "none";
            document.getElementsByClassName('to_pause')[index].style.display = "block";
          }else{
            storyAudioPlay.pause()
            document.getElementsByClassName('to_play')[index].style.display = "block";
            document.getElementsByClassName('to_pause')[index].style.display = "none";
          }
        } else {
          this.$refs.storyAudio.src = storyAudioUrl;
          storyAudioPlay.play()
          document.getElementsByClassName('to_play')[index].style.display = "none";
          document.getElementsByClassName('to_pause')[index].style.display = "block";
        }
      },
      ended(){
        document.getElementsByClassName('to_play')[this.currentIndex].style.display = "block";
        document.getElementsByClassName('to_pause')[this.currentIndex].style.display = "none";
      },
    },

    mounted(){
      axios.get('api/order/'+this.$route.params.id+'/detail').then(res => {
        this.orderMessage = res.data
        this.voiceStyle = this.orderMessage.voiceStyle.toString()
        let text = this.orderMessage.content
        this.allText = text
        let textNum = text.length
        if(textNum > 150){
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
        console.log(res.data)
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
  function excelDown(res){  // excel 下载请求
    //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
    var blob = new Blob([res.data], {type: 'application/vnd.ms-word'});
    var downloadElement = document.createElement('a');
    var href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = res.request.responseURL +`&token=${sessionStorage.JRYC_TOKEN}`;
    downloadElement.download = '列表'; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
  }
  axios.interceptors.response.use(res => {

    if (res.headers['content-type'] == 'application/vnd.ms-word' || res.headers['content-type'] == 'application/vnd.ms-word') {
      excelDown(res)
      return {code:0,state:'success'}
    }else{
      return res
    }
  })
</script>

<style lang="scss" scoped>
  p{
    margin-bottom: 0px;
  }
  .fast_detail{
    background: #ffffff;
    min-height: 85vh;
    margin: 20px;
    border-radius: 4px;
    padding: 40px 20px;
    .title{
      margin-bottom: 40px;
      position: relative;
      .dowload{
        position: absolute;
        right: 0;
        top: 5px;
        display: flex;
        align-items: center;
        color: #666666;
      }
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
      font-size: 18px;
      color: #222222;
      margin-bottom: 20px;
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
            justify-content: space-around;
            margin-left: 15px;
            .mess_title{
             // margin-top: 10px;
            }
            .time{
              font-size: 12px;
              color: #aeaeae;
              margin-bottom: 8px;
            }
          }
        }
        .middle{
          width: 100%;
          display: flex;
          padding-left: 65px;
          .to_play{
            margin-left: 10px;
            &:hover{
              cursor: pointer;
            }
          }
          .to_pause{
            margin-left: 10px;
            &:hover{
              cursor: pointer;
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
    .updata{
      margin-top: 150px;
      margin-bottom: 150px;
      width: 100%;
      text-align: center;
      .updata_input{
        &:hover{
          cursor: pointer;
        }
        .updata_text{
          color: #ffffff;
          background: #ffd101;
          border-radius: 4px;
          width: 170px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          box-shadow: 1px 2px 8px 2px rgba(255, 209, 1, 0.46);
          margin-bottom: 20px;
        }

      }
    }

  }
</style>
