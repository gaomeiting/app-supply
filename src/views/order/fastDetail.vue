<template>
  <div class="fast_detail">
    <div class="title">
      <span class="title_title">标题：</span>
      <span class="title_name">标题名称</span>
    </div>
    <div class="ask">
      <span class="ask_title">要求：</span>
      <div class="ask_list">
        <span class="each_ask">标题名称</span>
        <span class="each_ask">标题名称</span>
        <span class="each_ask">标题名称</span>
        <span class="each_ask">标题名称</span>
        <span class="each_ask">标题名称</span>
      </div>
    </div>
    <div class="text">
      <span class="text_title">文稿：</span>
      <span class="text_text" v-show="!isAllText">{{text}}<span class="click_all" @click="showAllText">查看全部 >></span></span>
      <span class="text_text" v-show="isAllText">{{allText}}<span class="click_all" @click="showShortText">收起 >></span></span>
    </div>
    <p class="demands_title"><span class="color">&nbsp;</span>交付记录</p>
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
    export default {
      data(){
        return{
          isAllText:false,
          isSuccse:false,
          text:'',
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
      },
      mounted(){
        console.log(this.text.length)
        var text = '据6月28日国家发 改委、商 务部联合发布的《外商投资准入特别管理措施（负面清单）（2018年版）》，今年7月28日起，取消专用车、新能源汽车整车制造外资股比限制，2020年取消商用车外资股比限制，2022年取消乘用车外资股比限制以及合资企业不超过两家的限制。据6月28日国家发 改委、商 务部联合发布的《外商投资准入特别管理措施（负面清单）（2018年版）》，今年7月28日起，取消专用车、新能源汽车整车制造外资股比限制，2020年取消商用车外资股比限制，2022年取消乘用车外资股比限制以及合资企业不超过两家的限制。据6月28日国家发 改委、商 务部联合发布的《外商投资准入特别管理措施（负面清单）（2018年版）》，今年7月28日起，取消专用车、新能源汽车整车制造外资股比限制，2020年取消商用车外资股比限制，2022年取消乘用车外资股比限制以及合资企业不超过两家的限制。'
        this.allText = text
        let textNum = text.length
        let box = document.getElementById('aa')
        console.log(this.text.substring(0,10))
        if(textNum >= 100){
          this.text = text.substring(0,150) + '...'
        }else{
          this.text = text
        }

        console.log(this.text)
      }
    }
</script>

<style lang="scss" scoped>
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
          color: rgba(217, 97, 74, 0.91);
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
  }
</style>
