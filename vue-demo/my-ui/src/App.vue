<template>
  <div id="app">
    <button @click="handleClick()">点击</button>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data () {
      return {}
    },
    mounted () {
      this.$message('很多文字很多文字很多文字很多文字很多文字很多文字很多文字很多文字很多文字很多文字很多文字很多文字很多文字很多文字', {
        autoClose: false,
        closeDelay: 3000,
        closeButton: {
          text: '确定',
          cb (data) {
            // 关闭回调触发
            // console.log(data)
          }
        }
      })
    },
    methods: {
      handleClick () {
        this.$message('I am toast')
      },
    }
  }
</script>

<style lang="scss" scoped>
  #app {
  }
</style>
