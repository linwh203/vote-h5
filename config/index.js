/**
 * @description webpack配置
 * @author minfive
 * @date 2017-07-17, 10:47:57 GMTCST
 * @lastModify minfive
 * @lastDate 2017-07-17, 10:47:57 GMTCST
 */

const 
	path = require('path'),
	Glob = require('glob').Glob,
	base = require('./base');
	baseprod = require('./base-prod');
	basetest = require('./base-test');


let { mapObject, arrToObj } = require('./util');

function getPath(...args) {
	return path.join(base.assetsRoot, ...args);
}

function getEntrySetting() {
	let result = {
		entry: {},
		template: []
	};

	new Glob('!(_)*/!(_)*.html', {
		cwd: getPath('pages'),
		sync: true
	})
		.found
		.forEach(file => {
			let pageName = file.split('/')[0];

			result.entry[pageName] = getPath('pages', pageName, 'js', 'index.js');
			// result.entry[pageName] = getPath('pages', 'news', 'js', 'index.js');
			result.template.push(getPath('pages', file));
		});

	return result;
}

let setting = getEntrySetting();

let baseConfig = Object.assign({}, base, {
	entry: base.isMultiplePage ? setting.entry : { index: getPath('pages/index/js/index.js') },
	template: base.isMultiplePage ? setting.template : [getPath('pages/index/index.html')],
	outputPath: base.buildRoot,
	commonAlias: mapObject(base.commonAlias, value => getPath(value))
});

let baseprodConfig = Object.assign({}, baseprod, {
    entry: baseprod.isMultiplePage ? setting.entry : { index: getPath('pages/index/js/index.js') },
    template: baseprod.isMultiplePage ? setting.template : [getPath('pages/index/index.html')],
    outputPath: baseprod.buildRoot,
    commonAlias: mapObject(baseprod.commonAlias, value => getPath(value))
});

let basetestConfig = Object.assign({}, basetest, {
    entry: basetest.isMultiplePage ? setting.entry : { index: getPath('pages/index/js/index.js') },
    template: basetest.isMultiplePage ? setting.template : [getPath('pages/index/index.html')],
    outputPath: basetest.buildRoot,
    commonAlias: mapObject(basetest.commonAlias, value => getPath(value))
});

module.exports = {
	build: Object.assign({
		env: require('./prod.env'),
		sourceMap: '#source-map'
	}, baseprodConfig),
	'build:d': Object.assign({
		env: require('./prod-d.env'),
		sourceMap: '#source-map'
	}, baseConfig),
	dev: Object.assign({
		env: require('./dev.env')
	}, baseConfig),
    buildtest: Object.assign({
        env: require('./test.env'),
        sourceMap: '#source-map'
    }, basetestConfig),
}