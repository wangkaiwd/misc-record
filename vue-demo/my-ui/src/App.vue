<template>
  <div id="app">
    <button @click="handleClick">上</button>
    <button @click="handleClick1">中</button>
    <button @click="handleClick2">下</button>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data () {
      return {}
    },
    methods: {
      handleClick () {
        this.$message('你的智商需要充值', {
          closeButton: {text: '已充值'}
        })
      },
      handleClick1 () {
        this.$message('你的智商需要充值', {
          position: 'middle',
          closeButton: {text: '已充值'}
        })
      },
      handleClick2 () {
        this.$message('你的智商需要充值', {
          position: 'bottom',
          closeButton: {text: '已充值'}
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    button {
      margin: 10px;
    }
  }
</style>
