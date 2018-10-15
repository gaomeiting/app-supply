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
                            <li v-for="(item, index) in list" :key="index">
                                <figure>
                                    <img src="/header.png" >
                                </figure>
                                <div class="info-wrap">
                                    <h3>叮当配官方</h3>
                                    <p class="time">
                                        <time>
                                           {{ item.creatTime }}
                                        </time>
                                    </p>
                                    <p class="info">
                                        {{ item.content }}
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="pagination-wrap" v-if="list.length>0">
                        <a-pagination size="small" :total="total" :current="current" :defaultPageSize="6" showQuickJumper :showTotal="total => `总共 ${total} 条`" @change="onChange" />
                    </div>
                    <div class="no-result-wrap" v-if="list.length == 0 && !loading">
                        <no-result title="空空如也~~"></no-result>
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
import NoResult from 'components/no-result/no-result';
import { handlerError } from 'api/catch';

export default {
    data() {
        return {
            currentUser: {
                'nickname': '系统管理员',
                'avatar': 'http://st.ddpei.cn/hv/avatar/2wJfH4mR6TCFKyd5DwsWXK.jpg?x-oss-process=style/avatar120png'
            },
            current: 1,
            list: [],
            size: 5,
            total: 0,
            loading: true
        }
    },
    created() {
        this._getNews()
    },
    methods: {
        onChange(current) {
            this.current = current
            this._getNews()
        },
        _getNews() {
            let page = this.current - 1;
            this.loading = true;
            this.$axios(`/api/notification?page=${page}&size=${this.size}`).then(res => {
                this.loading = false
                if(res.data.status == 200) {
                    if(!this.total) this.total = res.data.total;
                    this.list = res.data.data;
                    console.log(this.list)
                }
            }).catch(err => {
                this.loading = false;
                handlerError(err.data)
            })
        }
    },
    components: {
        SideBar,
        HeadNav,
        NoResult
    }
}
</script>
<style scoped lang="scss">
@import "~assets/scss/variable";
.no-result-wrap {
    padding: 60px 0;
}
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