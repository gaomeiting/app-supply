<template>
   <div class="page">
       <div class="head-wrap">
           <div class="logo">
               <img src="/logo.png" alt="">
           </div>
            <head-nav :user="currentUser" title="消息中心"></head-nav>
       </div>
       <div class="content-wrap">
           <div class="side-bar-wrap">
                <side-bar></side-bar>
            </div>
            <div class="content">
                <div class="list-wrap">
                    <div class="list-title">
                        全部通知
                    </div>
                    <div class="list-content">
                        <ul>
                            <li v-for="(item, index) in 6" :key="index">
                                <figure>
                                    <img src="/header.png" >
                                </figure>
                                <div class="info-wrap">
                                    <h3>叮当配官方</h3>
                                    <p class="time">
                                        <time>
                                            2018-09-01 16：30
                                        </time>
                                    </p>
                                    <p class="info">
                                        管理员给您开放了 订单《XXXXXXXXXXXXXX》 的权限，您可以查看文稿和上传音频了
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="pagination-wrap">
                        <a-pagination size="small" :total="100" :current="current" :defaultPageSize="6" showQuickJumper :showTotal="total => `总共 ${total} 条`" @change="onChange" />
                    </div>
                </div>
            </div>
       </div>
       
       <!-- 123456 -->
   </div>
</template>

<script>
import SideBar from 'components/sidebar/SidebarMenu';
import HeadNav from 'components/head-nav/head-nav';

export default {
    data() {
        return {
            
            currentUser: {
                'nickname': '系统管理员',
                'avatar': 'http://st.ddpei.cn/hv/avatar/2wJfH4mR6TCFKyd5DwsWXK.jpg?x-oss-process=style/avatar120png'
            },
            current: 1
        }
    },
    methods: {
        onChange(current) {
            this.current = current
        }
    },
    components: {
        SideBar,
        HeadNav
    }
}
</script>
<style scoped lang="scss">
@import "~assets/scss/variable";
.pagination-wrap {
    display: flex;
    justify-content: center;
    padding: 30px 0 50px;

}
.content-wrap {
    display: flex;
    .side-bar-wrap {
        flex: 0 0 200px;
        width: 200px;
        height: 100%;
        min-height: 100vh;
        background-color: #001529;
    }
    .content {
        flex: 1;
        padding: 20px;
        background: $color-background;
        .list-wrap {
            padding: 30px 30px 0;
            background-color: $color-background-d;
            border-radius: 8px;
            .list-title {
                font-size: $font-size-large;
                color: $color-text-d;
                text-indent: 0.5em;
                border-left:  4px solid $color-theme-d;
            }
            .list-content {
                padding-top: 16px;
                li {
                    border-bottom: 1px solid $color-background;
                    padding-top: 14px;
                    display: flex;
                    figure {
                        width: 48px;
                        height: 48px;
                        border-radius: 50%;
                        overflow: hidden;
                        margin-right: 16px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    &:last-child {
                        border-bottom: 1px solid $color-background-d;
                    }
                }
            }
        }
    }
}
.head-wrap {
    display: flex;
    align-items: center;
    .logo {
        flex: 0 0 200px;
        width: 200px;
        img {

        }
    }
    .nav-head {
        flex: 1;
    }
}
</style>