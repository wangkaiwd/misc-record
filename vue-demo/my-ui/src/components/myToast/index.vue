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
.my-toast {
	position: fixed;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
}
</style>
