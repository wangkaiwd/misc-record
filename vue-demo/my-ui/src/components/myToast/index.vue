<template>
  <div class="my-toast">
    MyToast
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

<style lang="less" scoped>
</style>
