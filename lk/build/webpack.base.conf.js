'use strict'
const devMode = process.env.NODE_ENV !== 'production'
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const babelConfig = require('./babel.config');

const styleLoader = devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader;
const postcssLoader = {
	loader: 'postcss-loader',
	// options: {
	// 	plugins: loader => [
	// 		// require('postcss-import')({ root: loader.resourcePath }),
	// 		// require('postcss-preset-env')(),
	// 		...(devMode ? [] : [
	// 			// require('cssnano')({
	// 			// 	preset: 'default',
	// 			// })
	// 		]),
	// 	],
	// }
};

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
	mode: process.env.NODE_ENV,
	entry: {
    	app: ['babel-polyfill', './src/main.js']
  	},
	
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
		  loader: 'vue-loader',
		  options: vueLoaderConfig,
	  },

      {
        test: /\.js$/,
        use: {
			loader: 'babel-loader',
            options: babelConfig,
        },
        include: [resolve('src'), resolve('test')]
      },
		{
			test: /\.(sa|sc|c)ss$/,
			oneOf: [
				/*`<style module>`*/
				{
					resourceQuery: /module/,
					use: [
						styleLoader,
						{
							loader: 'css-loader',
							options: {
								modules: true,
								localIdentName: '[local]_[hash:base64:5]'
							}
						},
						postcssLoader,
						'sass-loader',
					]
				},
				/*`<style>` || `<style scoped>`*/
				{
					use: [
						styleLoader,
						'css-loader',
						postcssLoader,
						'sass-loader',
					]
				}
			],
		},
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
