<template>
	<div class="page" id="ongoing" ref="ongoing">
        <div class="head-wrap">
           <div class="logo-wrap">
               <img src="/dubber/logo.png" alt="">
           </div>
            <head-nav :user="currentUser" :hideUser='hideUser'></head-nav>
       </div>
       <div class="content">
           <figure>
               <img src="/dubber/bg.png">
           </figure>
           <h3>你的资料正在审核中</h3>
           <p>我们会尽快完成审核并反馈结果，请耐心等待 <br> 关注 
           <a-tooltip placement="top" :getPopupContainer="getPopupContainer" overlayClassName="lay" >
                <template slot="title">
                 <img src="/dubber/code.jpg" class="code">
                </template>
                <span>叮当配音</span>
            </a-tooltip>
           公众号查看进度</p>
           
       </div>
    </div>
	
</template>
<script type="text/ecmascript-6">
import HeadNav from 'components/head-nav/head-nav';
export default {
	data() {
		return {
            error: '',
            currentUser: {
                'nickname': '系统管理员默认',
                'avatar': 'http://st.ddpei.cn/hv/avatar/2wJfH4mR6TCFKyd5DwsWXK.jpg?x-oss-process=style/avatar120png'
            },
            hideUser: true
		}
	},
	created() {
	},
	methods: {
		getPopupContainer() {
            return this.$refs.ongoing
        }
	},
	components: {
        HeadNav
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
/deep/ .lay {
    .ant-tooltip-inner {
        background-color: $color-background-d;
        padding: 0;
    }
    .ant-tooltip-arrow {
        border-top-color: $color-background-d;
    }
}
.page {
    background-color: $color-background;
}
.head-wrap {
    display: flex;
    align-items: center;
    box-shadow: 1px 0 4px rgba(0,0,0,0.1);
    background-color: $color-background-d;
    .logo-wrap {
        flex: 0 0 124px;
        width: 124px;
        margin-left: 2em;
        img {
            width: 100%;
        }
    }
    .nav-head {
        flex: 1;
    }
}
.code {
    width: 160px;
    height: 160px;
}
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 160px;
    figure {
        width: 220px;
        height: 206px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    h3 {
        font-size: $font-size-medium-x;
        color: $color-text-l;
        padding: 8px 0;
    }
    p {
        line-height: 1.5;
        span {
            color: $color-theme-d;
        }
    }
}

</style>