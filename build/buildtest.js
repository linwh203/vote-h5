/**
 * @description buildtest
 */

const
	path = require('path'),
	ora = require('ora'),
	rm = require('rimraf');

const config = require('../config');

process.env.NODE_ENV = 'buildtest';

const webpackConfig = require('./webpack.test.config');

let webpackCompile = require('./util').webpackCompile;

let spinner = ora('buildding for production-test...\n');

spinner.start();

rm(config.buildtest.buildRoot, err => {
	if (err) throw err;

	spinner.text = 'webpack build...';

	webpackCompile(webpackConfig, () => {
		spinner.stop();
	})
});