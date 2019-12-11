'use strict'

// const utils = require('./utils');
// const config = require('../config');
const isProduction = process.env.NODE_ENV === 'production';
const babelConfig = require('./babel.config');

module.exports = {
	esModule: true,
	/*при установке в false пробельные символы между HTML тегами в шаблонах будут проигнорированы*/
	preserveWhitespace: false,
	extract: isProduction,
	loaders: {
		js: {
			loader: 'babel-loader',
			options: babelConfig,
		},
	},
	// postLoaders: {
	// 	html: 'babel-loader',
	// },
	transformToRequire: {
		video: ['src', 'poster'],
		source: 'src',
		img: 'src',
		image: 'xlink:href'
	},
};

