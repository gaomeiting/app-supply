<template>
	<div class="footer">
        <ul>
            <li v-for="(item, index) in list" :key="index">
                <figure>
                    <img :src="item.image">
                </figure>
                <p v-html="item.text">
                </p>
            </li>
        </ul>
    </div>
	
</template>
<script type="text/ecmascript-6">
export default {
	props: {
        list: {
            dafault: Array,
            default() {
                return {}
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/variable";
.footer {
    width: 100%;
    background: #000;
    position: absolute;
    bottom: 0;
    ul {
        width: 1099px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        li {
            figure {
                width: 110px;
                height: 110px;
                border-radius: 20px;
                overflow: hidden;
                margin-top: -50px;
                box-shadow: 1px 0 4px rgba(0,0,0,0.1);
            }
            p {
                line-height: 1.6;
                color: $color-background-d;
            }
        }
    }
}


</style>