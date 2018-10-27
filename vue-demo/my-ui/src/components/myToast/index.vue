<template>
  <div class="my-toast" :class="position" ref="myToast">
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
  // toast问题总结：
  //  1. api设计：
  //      a. open: 如何让toast出现（调用方法）
  //      b. 如何进行参数传入？(先通过掉用函数传入，之后构造实例的时候通过propsData来进行传入)
  //      c. 传入的内容是对象的时候，要在给定默认值和使用的时候进行非空判断，防止出错
  //  2. 使用install方法编写插件，通过Vue.use()方法使用插件（通过工程问题解释了为什么）
  //  3. 为什么要将toast加入body中？以及如何加入（细节：传参;将提示文字传入slot中）
  //  4. 样式注意问题：
  //      a. 左边线为什么要通过js实现
  //      b. 右侧关闭按钮在左侧内容变多的时候会缩小，要设置: flex-shrink: 0;
  //         flex 默认会缩小，不会放大

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
      },
      position: {
        type: String,
        default: 'top',
        validator (val) {
          return ['top', 'bottom', 'middle'].includes(val)
        }
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
        if (this.closeButton && typeof this.closeButton.cb === 'function') {
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
    left: 50%;
    line-height: 1.8;
    border-radius: $border-radius;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    background-color: $toast-bg;
    color: $white;
    padding: 6px 16px;
    transform: translateX(-50%);
    transition: all 1s;
    @keyframes animateTop {
      0% {
        transform: translate(-50%, -100%);
      }
      100% {
        transform: translate(-50%, 0);
      }
    }
    @keyframes animateBottom {
      0% {
        transform: translate(-50%, 100%);
      }
      100% {
        transform: translate(-50%, 0);
      }
    }
    &.top {top: 0;transform: translate(-50%, 0);animation: animateTop .3s;}
    &.bottom {bottom: 0;transform: translate(-50%, 0);animation: animateBottom .3s;}
    &.middle {top: 50%;transform: translate(-50%, -50%);}
    .line {
      position: absolute;top: 0;
      right: 0;padding-left: 16px;border-left: 2px solid #666;
    }
    .toast-button {
      cursor: pointer;display: inline-flex;align-items: center;justify-content: center;
      height: 100%;padding-left: 16px;margin-left: 16px;flex-shrink: 0;
    }
  }
</style>
