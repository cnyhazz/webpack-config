'use strict';

//环境压入标识 用来判断当前环境是生产还是开发
process.argv.push('--dev');
var webpack = require('webpack'),
	WebpackDevServer = require('webpack-dev-server'),
	config = require('./webpack.dev.config'),
	open = require('open');

	config.entry.unshift("webpack-dev-server/client?http://127.0.0.1:" + config.devServer.port);

new WebpackDevServer(webpack(config), config.devServer)
	.listen(config.devServer.port, '0.0.0.0', (err) => {
		if (err) {
			console.log(err);
		}
		console.log('服务器端口:' + config.devServer.port);
		console.log('正在打开默认浏览器...');
		open('http://localhost:' + config.devServer.port);
	});