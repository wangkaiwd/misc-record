<template>
  <div class="my-toast">
    <slot></slot>
  </div>
</template>

<script>
// api设计：
// 1. open 2. position 3. autoClose 4. autoCloseTime 5. close
// import Vue from 'vue'
// 侵入性太强
// Vue.prototype.$toast = function() {
// 	console.log('我是toast')
// }
export default {
	name: 'MyToast',
	props: {},
	mounted() {}
}
</script>

<style lang="scss" scoped>
$font-size: 14px;
$toast-height: 40px;
$toast-bg: rgba(0, 0, 0, 0.75);
$border-radius: 4px;
$white: #fff;
.my-toast {
	position: fixed;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	line-height: 1.8;
	height: $toast-height;
	border-radius: $border-radius;
	box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	background-color: $toast-bg;
	color: $white;
	padding: 0 16px;
}
</style>
