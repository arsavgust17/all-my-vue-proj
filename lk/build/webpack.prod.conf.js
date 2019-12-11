'use strict'
const devMode = process.env.NODE_ENV !== 'production';
const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const loadMinified = require('./load-minified')
const WebpackMd5Hash  = require('webpack-md5-hash')
const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // https://www.npmjs.com/package/webpack-md5-hash
    // нужно чтобы после обновления загружалась новая версия приложения
    new WebpackMd5Hash(),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
	  new VueLoaderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: true
    // }),
    // extract css into its own file
    // new ExtractTextPlugin({
    //   filename: utils.assetsPath('css/[name].[contenthash].css')
    // }),
    new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // new OptimizeCSSPlugin({
    //   cssProcessorOptions: {
    //     safe: true
    //   }
    // }),
    new OptimizeCSSAssetsPlugin({
        // assetNameRegExp: /\.optimize\.css$/g,
        // cssProcessor: require('cssnano'),
        // cssProcessorPluginOptions: {
        //     preset: ['default', { discardComments: { removeAll: true } }],
        // },
        // canPrint: true,
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
		  collapseInlineTagWhitespace: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // chunksSortMode: 'dependency',
		chunksSortMode: 'none',
      serviceWorkerLoader: `<script>${loadMinified(path.join(__dirname,
        './service-worker-prod.js'))}</script>`
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // service worker caching
    new SWPrecacheWebpackPlugin({
      cacheId: 'webbankir-pwa',
      filename: 'service-worker.js',
      staticFileGlobs: ['dist/**/*.{js,html,css}'],
      minify: true,
      stripPrefix: 'dist/'
    }),
  ]
})

if (config.build.productionGzip) {
	const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');
	/*/\.(js|css|html|svg)$/*/
	const regExp = new RegExp(
		'\\.(' +
		config.build.productionGzipExtensions.join('|') +
		')$'
	);
	webpackConfig.plugins.push(
		new BrotliGzipPlugin({
			asset: '[path].br[query]',
			algorithm: 'brotli',
			test: regExp,
			threshold: 10240,
			minRatio: 0.8
		}),
		new BrotliGzipPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: regExp,
			threshold: 10240,
			minRatio: 0.8
		})
	);
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
