'use strict'

//测试打包后的文件是否有问题
 var express = require('express'),
 	 proxyMiddleware = require('http-proxy-middleware'),
 	 open = require('open');

// var proxy = proxyMiddleware({
//     target: 'http://10.118.201.23:8080/',
//     changeOrigin: true,
//     logLevel: 'debug'
// });

 
var app = express();
app.use(express.static(__dirname + '/dist'));
	// app.use('/cfs-api',proxy);
    app.listen(3000,function(){
    	console.log('服务器端口:' + 3000);
		console.log('正在打开默认浏览器...');
    	open('http://localhost:3000' /*+ config.port*/);
    });