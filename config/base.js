/**
 * @description webpack通用配置
 */

const path = require('path');

module.exports = {
	// 多页配置
	isMultiplePage: true,
	// 是否启用异步加载功能
	isOpenSyncImport: true,
	// 最小chunk的大小
	minChunkSize: 10000,
	// dev模式下是否自动打开页面
	autoOpenBrowser: true,
	// 文件目录
	assetsRoot: path.resolve(__dirname, '../src'),
	// 生成目录
	buildRoot: path.resolve(__dirname, '../dist'),
	// 静态资源根目录
	staticAssets: 'static',
	// 生成路径
	publicPath: '/',
	//publicPath: './',
	// 公用别名
	commonAlias: {
		Static: 'static',
        'vue$': '../node_modules/vue/dist/vue.js',
        '@': 'pages',
        'Guess@': 'pages/guess/js',
		'Vote@': 'pages/vote/js',
		'Spa@': 'pages/index',
		'Spa@comp': 'pages/index/js/components',
		'@src': '../src'
	},
	// 外部扩展
	externals: {

	},
	// 公众模块(默认情况下common／js文件下的文件作为`commons chunk`打包)
	commons: {
		// 'axios': 'axios'
	},
	// 要打包的外部资源库
	library: [
		'axios',
		'vue',
		'vue-router',
		'vuex'
	],
	// 要引进外部资源库的页面(为空则全部引入)
	libraryEntry: [],
	// 本地开发端口
	port: 8009,
	// 本地开发代理
	proxy: {
		'/api': {
			target: "http://hcp-sh-wechat.hcpackaging.com",
			changeOrigin: true,
			pathRewrite: {
				'^/api': ''
			},
			logLevel: 'error'
		}
		// http://hcp-sh-wechat.hcpackaging.com/Ajax/Product/query/Vote.htm?activityID=1&urUnioniD=hunk&voteNumber=pic1
	}
}