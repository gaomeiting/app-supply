<template>
	<div>
        我是新页面
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
		this.getPlayer()
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



</style>