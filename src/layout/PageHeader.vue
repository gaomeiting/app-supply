<template>
  <div class="page-header">
    <div>
      <breadcrumb style="margin-bottom: 16px;" />
      <div class="detail">
        <div v-if="avatar" class="avatar"><a-avatar :src="avatar" /></div>
        <div class="main">
          <div class="row">
            <img v-if="logo" :src="logo" class="logo" />
            <h1 v-if="title" class="title">{{title}}</h1>
            <div class="action"><slot name="action" /></div>
          </div>
          <div class="row">
            <div v-if="this.$slots.content" class="content"><slot name="content" /></div>
            <div v-if="this.$slots.extra" class="extra"><slot name="extra" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ABreadcrumb from 'ant-design-vue/es/breadcrumb'
  import AAvatar from 'ant-design-vue/es/avatar/Avatar'
  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    components: {ABreadcrumb, AAvatar, Breadcrumb},
    props: {
      title: {type: String, required: false},
      logo: {type: String, required: false},
      avatar: {type: String, required: false}
    }
  }
</script>


<style lang="scss">
  .page-header {
    background: #fff;
    padding: 16px 32px 0;
    margin-top: 1px;
    border: 1px solid #e8e8e8;
    border-width: 1px 0;
    .detail {
      display: flex;
      .row {
        display: flex;
        width: 100%;
      }
      .avatar {
        flex: 0 1 72px;
        margin: 0 24px 8px 0;
        & > span {
          border-radius: 72px;
          display: block;
          width: 72px;
          height: 72px;
        }
      }
      .main {
        width: 100%;
        flex: 0 1 auto;
        .title {
          flex: auto;
          font-size: 20px;
          font-weight: 500;
          color: rgba(0, 0, 0, .85);
          margin-bottom: 16px;
        }
        .logo {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          margin-right: 16px;
        }
        .content {
          flex: auto;
          margin-left: 44px;
          margin-bottom: 1em;
        }
        .extra {
          flex: 0 1 auto;
          margin-left: 88px;
          min-width: 242px;
          text-align: right;
        }
        .action {
          flex: 0 1 auto;
          text-align: right;
          min-width: 266px;
          margin-left: 56px;
        }
      }
    }
  }
</style>

