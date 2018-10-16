<template>
<transition name="confirm-fade">
<div class="confirm" v-show="flag" @click.stop="hide">
	<div class="confirm-wrapper">
		<div class="confirm-content">
			<slot></slot>
			<p class="text">请使用微信扫描二维码登录</p>
			<div class="operate-btn">
					<i class="iconfont icon-shanchu"></i>
			</div>
		</div>
	</div>
</div>
</transition>
</template>

<script type="text/ecmascript-6">
export default {
props: {
	text : {
		type: String,
		default: ''
	},
	confirmBtnText: {
		type: String,
		default: '确认'
	}
},
data() {
	return {
		flag: false
	}
},
methods: {
	show() {
		this.flag=true;
	},
	hide() {
		this.flag=false;
	},
	cancle() {
		this.$emit('cancle');
		this.hide()
	},
	confirm() {
		this.$emit('confirm');
		this.hide()
	}
}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";

.confirm {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	z-index: 998;
	background-color: rgba(0,0,0,0.3);
	&.confirm-fade-enter-active {
		animation: confirm-fadein 0.3s;
		.confirm-content {
			animation: confirm-zoom 0.3s;
		}
	}
	&.confirm-fade-leave-active {
		animation: confirm-fadeout 0.4s;
	}
	.confirm-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 999;
		.confirm-content {
			width: 400px;
			border-radius: 13px;
			background: $color-background-d;
			.text {
				padding: 19px 15px;
				line-height: 22px;
				text-align: center;
				font-size: $font-size-medium;
				color: $color-text-l;
			}
			.operate-btn {
				position: absolute;
				top: 12px;
				right: 12px;
				cursor: pointer;
				.iconfont {
					font-size: $font-size-large;
				}
			}
		}
	}
}
@keyframes confirm-fadein {
	0% {
	  opacity: 0;
	}
	100% {
	  opacity: 1;
	}
}

@keyframes confirm-zoom {
	0% {
	  transform: scale(0);
	}
	50% {
	  transform: scale(1.1);
	}
	100% {
	  transform: scale(1);
	}
}
@keyframes confirm-zoomout {
	0% {
	  transform: scale(1);
	}
	100% {
	  transform: scale(0);
	}
}
@keyframes confirm-fadeout {
	0% {
	  opacity: 1;
	}
	100% {
	  opacity: 0;
	}
}
</style>