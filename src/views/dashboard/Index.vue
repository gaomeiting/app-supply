<template>
    <page-layout :avatar="currentUser.avatar">
        <div slot="headerContent">
            <div class="title">你好，<span>{{currentUser.nickname}}</span></div>
            <div>测试新消息</div>
        </div>
        <div>
            <a-card title="进行中的项目"></a-card>
        </div>
    </page-layout>
</template>

<script>
import ACard from 'ant-design-vue/lib/card'
import PageLayout from '@/layout/PageLayout'

export default {
    name: "dashboard",
    components: {ACard, PageLayout},
    computed: {
        currentUser () {
            return {
                'nickname': '系统管理员',
                'avatar': 'http://st.ddpei.cn/hv/avatar/2wJfH4mR6TCFKyd5DwsWXK.jpg?x-oss-process=style/avatar120png'
            }
        }
    }
}
</script>
