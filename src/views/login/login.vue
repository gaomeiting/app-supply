<template>
	<div class="page login">
		<div class="head-bar-wrap">
			<head-bar></head-bar>
		</div>
		<div class="content">
			<div class="text">
				<h2>让每个美好的声音都有价值</h2>
				<p>成立于2000年 至今服务过上百个国内国际知名品牌！</p>
				<a href="javascript:;" class="btn" @click="showAlertBox">配音员入驻</a>
			</div>
			<figure>
				<img src="/singer.jpg" alt="配音员入驻">
			</figure>
		</div>
		<alert-box ref="alertBox">
			<div id="login_container"></div>
		</alert-box>
		
		
		<foot-bar :list="list"></foot-bar>
	</div>
	
</template>
<script type="text/ecmascript-6">
import HeadBar from 'components/head-bar/head-bar';
import FootBar from 'components/footbar/footbar';
import { handlerError } from 'api/catch';
import AlertBox from 'components/alert/alert';
import { mapGetters, mapMutations } from 'vuex';
export default {
	data() {
		return {
			list : [
				{
					image: '/footer_icon_1.png',
					text: '让你的声音被更多的人听见 <br> 已有超过2000家客户选择了叮当配'
				},
				{
					image: '/footer_icon_2.png',
					text: '严格的声音质量把关，配音晋升体系 <br> 专业的声音经济，让你的声音价值最大化'
				},
				{
					image: '/footer_icon_3.png',
					text: '项目准时借款率100% <br> 你不敢想的，我们真的做到了'
				}
			]
		}
	},
	created() {
		if(this.user) {
			this.setLogOut();
		}
		let state = this.$route.query.redirect || '/';
		this.$nextTick(() => {
			let obj = new WxLogin ({
				id:"login_container",
				appid: "wx488c5ae325198186",
				scope: "snsapi_login",
				redirect_uri: encodeURI("http://mp.ddpei.cn/api/user/wechat/auth") ,
				state,
				style: "black",      
				href: "http://mp.ddpei.cn/code.css"
			});
		})
		
	},
	computed: {
		...mapGetters(['user'])
	},
	methods: {
		showAlertBox() {
			this.$refs.alertBox.show()
		},
		...mapMutations({
			'setLogOut' : 'SET_LOGOUT'
		})
	},
	components: {
		FootBar,
		HeadBar,
		AlertBox
	}
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
#login_container {
	display: flex;
	justify-content: center;
}
.page {
	padding-bottom: 180px;
	
	.head-bar-wrap {
		padding: 18px 0;
		box-shadow: 1px 0 4px rgba(0,0,0,0.1);
		background-color: $color-background-d;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}
	.content {
		width: 1089px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 140px;
		h2 {
			font-size: 36px;
		}
		p {
			padding-bottom: 28px;
		}
		figure {
			width: 600px;
		}
	}
	.btn {
		display: block;
		width: 152px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		color: $color-text-l;
		background-color: $color-theme-d;
		border-radius: 4px;
		font-size: $font-size-medium-x;
	}
	
}

</style>

