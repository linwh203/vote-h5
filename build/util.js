/**
 * @description util工具集
 */

const
	path = require('path'),
	chalk = require('chalk'),
	webpack = require('webpack');
	ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('../config');

function webpackCompile(config, before, after, stdout = true) {
	return webpack(config, (err, stats) => {
		if (err) throw err;

		before && before();

		if (stdout) {
			process.stdout.write(stats.toString({
				colors: true,
				modules: false,
				children: false,
				chunks: false,
				chunkModules: false
			}) + '\n\n');
			console.log(chalk.cyan('Build complete.\n'));
		}

		process.nextTick(() => after && after());
	});
}

function nowConfig() {
    if(process.env.NODE_ENV === 'production'){
        return config.build
    }else if(process.env.NODE_ENV === 'buildtest'){
        return config.buildtest
    }else{
        return config.dev
    }
	// return process.env.NODE_ENV === 'production'
	// 	? config.build
	// 	: config.dev;
}

function commonsChunkName() {
	let config = nowConfig();

	return config.isOpenSyncImport 
		? []
		: Object.keys(config.commons).concat('common');
}

function cssLoaders(options) {
    options = options || {}

    var cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders (loader, loaderOptions) {
        var loaders = [cssLoader]
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

// Generate loaders for standalone style files (outside of .vue)
function styleLoaders(options) {
    var output = []
    var loaders = exports.cssLoaders(options)
    for (var extension in loaders) {
        var loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}

module.exports = {
	webpackCompile,
	nowConfig,
	commonsChunkName,
    cssLoaders,
    styleLoaders
}