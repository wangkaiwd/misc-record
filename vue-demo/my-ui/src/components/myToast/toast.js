import Toast from './index'

const install = Vue => {
  Vue.prototype.$message = function (message, options) {
    // 在调用的时候已经为appendBody赋值了
    appendBody(Vue, message, options)
  }
}
const appendBody = (Vue, message, options) => {
  // Vue.extend:使用基础Vue构造器，创建一个子类。参数是一个包含组件选项的对象
  // 注意：在Vue.extend()中data选项必须是函数
  const Constructor = Vue.extend(Toast)
  // propsData: 只用于new创建的实例中。创建实例时传递props。主要作用是方便测试
  const toast = new Constructor({
    propsData: {...options}
  })
  // vm.$slots:用来访问被插槽分发的内容。default属性包括了所有没有被包含在具名插槽中的节点
  toast.$slots.default = [message]
  // 可以使用vm.$mount()手动地挂载一个未挂载的实例。
  // 如果没有提供elementOrSelector参数，模板将被渲染为文档之外的元素，并且你必须使用原生DOM API把它插入文档中
  toast.$mount()
  // vm.$el: Vue实例使用的根dom元素
  document.querySelector('body').appendChild(toast.$el)
}

export default {
  install
}
