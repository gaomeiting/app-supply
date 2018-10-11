<template>
	<div class="page">
		<div class="content">
			<div class="text">
				<h2>让每个美好的声音都有价值</h2>
				<p>成立于2000年 至今服务过上百个国内国际知名品牌！</p>
				<a href="javascript:;" class="btn">配音员入驻</a>
			</div>
			<figure>
				<img src="/singer.png" alt="配音员入驻">
			</figure>
		</div>
	</div>
	
</template>
<script type="text/ecmascript-6">
export default {
	data() {
		return {
			error: ''
		}
	},
	created() {
		//this.getPlayer()
	},
	methods: {
		getPlayer() {
			getData(`/api/activity/107/detail`).then(res=>{
				
			}).catch(err => {
				this._handlerError(err)
			})
		}
	},
	components: {
	}
}
</script>

<style scoped lang="scss">

.page {
	.content {
		width: 1089px;
		margin: 0 auto;
		display: flex;
	}
}

</style>