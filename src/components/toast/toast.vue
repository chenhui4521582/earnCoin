<template>
  <!-- 全局提示框 -->
  <transition name="van-fade">
		<div v-show="visible"  class="notify-tips" >
			<div class="notify-tips-text">{{message}}</div>
		</div>
  </transition>
</template>
<script>
export default {
	name:'toast',
	data() {
		return {
			visible: false,
			message: "",
		};
	},
	computed: {
	},
};
</script>
<style lang="less" scope>
.notify-tips {
	position: fixed;
	z-index: 9999;
	max-width: 80%;
	left: 50%;
	top:50%;
	transform: translate(-50%, -50%);
	box-sizing: border-box;
	text-align: center;
	background-color: rgba(80, 80, 80, 0.9);
	border-radius: .16rem;
	line-height: .4rem;
	padding: .2rem .3rem;
	word-wrap:break-word;
	word-break:break-all;
	overflow: hidden;
	.notify-tips-text{
		color: #ffffff;
		font-size: .24rem;
	}
}
</style>