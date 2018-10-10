<template>
  <div class="page_layout">
    <page-header :title="title" :logo="logo" :avatar="avatar">
      <slot name="action" slot="action" />
      <slot name="headerContent" slot="content" />
      <div slot="content" v-if="!this.$slots.headerContent && desc">
        <p style="font-size: 14px;line-height: 1.5;color: rgba(0,0,0,.65)">{{desc}}</p>
        <div class="link">
          <template v-for="(link, index) in linkList">
            <a :key="index" :href="link.href"><a-icon :type="link.icon" /></a>
          </template>
        </div>
      </div>
    </page-header>
    <div ref="page" :class="['page-content']"><slot /></div>
  </div>
</template>

<script>
  import AIcon from 'ant-design-vue/lib/icon'
  import PageHeader from './PageHeader'

  export default {
    name: 'PageLayout',
    components: {AIcon, PageHeader},
    props: ['desc', 'logo', 'title', 'avatar', 'linkList', 'extraImage'],
  }
</script>
