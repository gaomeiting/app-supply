<template>
  <page-layout :desc="desc" :title="title" :linkList="linkList">
    <div slot="extra" class="extraImg">
      <img :src="extraImage"/>
    </div>
    <transition name="page-toggle">
      <router-view ref="page" />
    </transition>
  </page-layout>
</template>

<script>
  import PageLayout from './PageLayout'

  export default {
    name: 'PageView',
    components: {PageLayout},
    data () {
      return {
        title: '',
        desc: '',
        linkList: [],
        extraImage: ''
      }
    },
    watch: {
      '$route' () {
        this.getContentHeader()
      }
    },
    created () {
      this.getContentHeader()
    },
    methods: {
      getContentHeader() {
        this.title = this.$route.meta.breadcrumbName
        this.desc = this.$route.meta.desc
      }
    }
  }
</script>
