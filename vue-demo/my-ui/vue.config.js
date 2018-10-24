const path = require('path')
function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	chainWebpack: config => {
		config.resolve.extensions
			.merge(['.js', '.scss', '.vue', '.json'])
			.end()
			.alias.set('@', resolve('src'))
			.set('styles', resolve('src/assets/styles'))
			.set('components', resolve('src/components'))
			.set('views', resolve('src/views'))
	}
}
