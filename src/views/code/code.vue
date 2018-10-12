<template>
	<div class="page" id="ongoing" ref="ongoing">
        <div class="head-wrap">
           <div class="logo-wrap">
               <img src="/logo.png" alt="">
           </div>
            <head-nav :user="currentUser"></head-nav>
       </div>
       <div class="content">
           <figure>
               <img src="/code.jpg">
           </figure>
           <h3>关注公众号,去认证配音员</h3>
           
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
            }
		}
	},
	created() {
	},
	methods: {
	},
	components: {
        HeadNav
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";

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
        color: $color-text-l;
    }
}

</style>