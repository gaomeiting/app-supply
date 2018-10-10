<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <img alt="logo" class="logo" src="@/assets/logo.png" />
          <span class="title">叮当配管理系统</span>
        </div>
        <div class="desc">叮当配 - 知识付费产业链声咖/内容创作者协作平台</div>
      </div>
      <div class="login">
        <a-form @submit="onSubmit" :autoFormCreate="(form) => this.form = form">
            <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
              <a-form-item
                fieldDecoratorId="name"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账户名', whitespace: true}]}"
              >
                <a-input size="large" placeholder="用户名" >
                  <a-icon slot="prefix" type="user" />
                </a-input>
              </a-form-item>
              <a-form-item
                fieldDecoratorId="password"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码', whitespace: true}]}"
              >
                <a-input size="large" placeholder="登录密码" type="password">
                  <a-icon slot="prefix" type="lock" />
                </a-input>
            </a-form-item>
          <a-form-item>
            <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import AForm from 'ant-design-vue/es/form/Form'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import AInput from 'ant-design-vue/es/input/Input'
import AIcon from 'ant-design-vue/es/icon/icon'
import AInputGroup from 'ant-design-vue/es/input/Group'
import AButton from 'ant-design-vue/es/button/button'
import ACol from 'ant-design-vue/es/grid/Col'
import ARow from 'ant-design-vue/es/grid/Row'
import ACheckbox from 'ant-design-vue/es/checkbox/Checkbox'
import AAlert from 'ant-design-vue/es/alert/index'

export default {
  name: 'login',
  components: {
    AAlert,
    ACheckbox,
    ACol,
    ARow,
    AButton,
    AInputGroup,
    AIcon,
    AInput,
    AFormItem,
    //GlobalFooter,
    //ATabPane,
    //ATabs,
    AForm},
  data () {
    return {
      usernameToken: {username: 'admin', password: '111111'},
      logging: false,
      error: ''
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.logging = true
          this.$axios.post('/api/user/login', {
            username: this.form.getFieldValue('name'),
            password: this.form.getFieldValue('password')
          }).then((res) => {
            this.logging = false
            const result = res.data
            if (result.code >= 0) {
              const user = result.data.user
              this.$router.push('/')
              this.$store.commit('account/setuser', user)
              this.$message.success(result.message, 3)
            } else {
              this.error = result.message
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background: #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center;
    background-size: 100%;
    .content {
      padding: 32px 0;
      flex: 1;
      @media (min-width: 768px){
        padding: 112px 0 24px;
      }
      .top {
        text-align: center;
        .header {
          height: 44px;
          line-height: 44px;
          a {
            text-decoration: none;
          }
          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
          }
          .title {
            font-size: 33px;
            color: rgba(0,0,0,.85);
            font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0,0,0,.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }
      .login{
        width: 368px;
        margin: 0 auto;
        @media screen and (max-width: 576px) {
          width: 95%;
        }
        @media screen and (max-width: 320px) {
          .captcha-button{
            font-size: 14px;
          }
        }
        .icon {
          font-size: 24px;
          color: rgba(0, 0, 0, 0.2);
          margin-left: 16px;
          vertical-align: middle;
          cursor: pointer;
          transition: color 0.3s;
          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }
</style>