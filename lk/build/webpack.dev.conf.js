'use strict';

const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    devServer: {
		host: '172.16.8.143', // you can change this ip with your ip
		port: 8443,       // ssl defult port number
		inline:true,
		https: {
			key: fs.readFileSync('./build/certs/key.pem', 'utf8'),
			cert: fs.readFileSync('./build/certs/server.crt', 'utf8'),
		},
    },
	
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env,
        }),
        // // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        // // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            chunksSortMode: 'none',
            serviceWorkerLoader: `<script>${fs.readFileSync(path.join(__dirname,
                './service-worker-dev.js'), 'utf-8')}</script>`,
        }),
        new FriendlyErrorsPlugin(),
        // new UnusedFilesWebpackPlugin()
    ],
 
});
