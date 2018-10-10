<template>
  <page-layout :title="title">
        <div>
            <a-card title="ABOUT PAGE"></a-card>
        </div>
    </page-layout>
</template>

<script>
import ACard from 'ant-design-vue/lib/card'
import PageLayout from '@/layout/PageLayout'

export default {
  name: "about",
  components: {ACard, PageLayout},
  data () {
    return {
      title: '关于我们'
    }
  }
}
</script>
