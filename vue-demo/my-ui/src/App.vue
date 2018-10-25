<template>
  <div id="app">
    <button @click="handleClick">点击</button>
  </div>
</template>
<script>
export default {
	name: 'App',
	data() {
		return {}
	},
	mounted() {},
	methods: {
		handleClick() {
			this.$message('I am toast')
		}
	}
}
</script>

<style lang="scss" scoped>
#app {
}
</style>
