<template>
  <!-- <div class="my-toast" ref="myToast"> -->
  <div class="my-toast" ref="myToast">
    <div class="toast-content">
      <slot></slot>
    </div>
    <template v-if="closeButton">
      <div class="line" ref="line"></div>
      <div @click="onClickClose"
           ref="toastButton"
           class="toast-button">
        {{closeButton.text}}
      </div>
    </template>
  </div>
</template>

<script>
  // api设计：
  // 1. open : 通过调用vue实例上的方法来展示toast
  // 2. close
  // 2. position 3. autoClose 4. autoCloseTime 5. close
  // import Vue from 'vue'
  // 侵入性太强
  // Vue.prototype.$toast = function() {
  // 	console.log('我是toast')
  // }

  export default {
    name: 'MyToast',
    props: {
      autoClose: {
        // 是否自动关闭
        type: Boolean,
        default: false
      },
      closeDelay: {
        type: Number | String,
        default: 2000
      },
      closeButton: {
        type: Object,
        required: false
      }
    },
    mounted () {
      this.onAutoClose()
      this.lineStyle()
      window.addEventListener('resize', this.lineStyle)
    },
    beforeDestroy () {
      clearTimeout(this.timerId)
      window.removeEventListener('resize', this.lineStyle)
    },
    methods: {
      close () {
        // Element.remove():继承自ChildNode接口，用于将当前元素节点从它的父节点移除
        // this.$refs.myToast.remove()
        this.$el.remove()
        this.$destroy()
      },
      onAutoClose () {
        if (this.autoClose) {
          setTimeout(() => {
            this.close()
          }, Number(this.closeDelay))
        }
      },
      onClickClose () {
        this.close()
        if (this.closeButton) {
          this.closeButton.cb(this)
        }
      },
      // 要使用js生成line高度的和右偏移量的原因
      //    1. 父元素高度无法写死，所以子元素的高度无法根据父元素高度来设置，只能通过js来动态获取
      //    2. 为什么要定位：因为父元素设置了上下padding之后，子元素即使通过js设置高度为父元素高度，
      //       依旧会由于父元素上下padding而撑高内容
      //    其它解决方法：通过为内容区域设置padding而不是给my-toast设置padding来节省js操作
      //    这样的话就可以不用js来设置css，所以css解决不了的问题只有一个：无法获取高度
      lineStyle () {
        if (!this.closeButton) return
        //  this.$el === this.$refs.myToast
        const {myToast, line, toastButton} = this.$refs
        this.$nextTick(() => {
          line.style.height = myToast.offsetHeight + 'px'
          line.style.right = toastButton.offsetWidth + 'px'
        })
      },
    }
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
    border-radius: $border-radius;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    background-color: $toast-bg;
    color: $white;
    padding: 6px 16px;
    .line {
      position: absolute;
      top: 0;
      right: 0;
      padding-left: 16px;
      border-left: 2px solid #666;
    }
    .toast-button {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding-left: 16px;
      margin-left: 16px;
      flex-shrink: 0;
    }
  }
</style>
