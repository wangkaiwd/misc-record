import Toast from './index'
const install = Vue => {
	Vue.prototype.$message = function(message) {
		// 在调用的时候已经为appendBody赋值了
		appendBody(Vue, message)
	}
}
const appendBody = (Vue, message) => {
	// Vue.extend:使用基础Vue构造器，创建一个子类。参数是一个包含组件选项的对象
	// 注意：在Vue.extend()中data选项必须是函数
	const Constructor = Vue.extend(Toast)
	const toast = new Constructor()
	// vm.$slots:用来访问被插槽分发的内容。default属性包括了所有没有被包含在具名插槽中的节点
	toast.$slots.default = [message]
	toast.$mount()
	document.querySelector('body').appendChild(toast.$el)
}

export default {
	install
}
