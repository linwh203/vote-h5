module.exports = {
	"plugins": {
		"postcss-import": {
			path: [
				'src/pages',
				'node_modules'
			]
		},
		"postcss-nesting": {
			prefix: null
		},
		"postcss-css-variables": {
			preserve: false
		},
		"postcss-cssnext": {
			browsers: [
				"> 1%",
			    "last 2 versions"
			]
		},
        // to edit target browsers: use "browserlist" field in package.json
        //"autoprefixer": {},
        'postcss-px2rem':{
			remUnit: 75
		},
		'autoprefixer':{
			browsers: ['IOS >= 7', 'Android >= 4.0']
		}
	}
}