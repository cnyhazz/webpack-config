'use strict'

const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
//端口号
const port = 2333;
//去除警告
process.noDeprecation = true

module.exports = {

    //公共文件存放地址
    context : __dirname + '/src',

    //入口文件，可配置多个或单个
    entry : [
        './app'
    ],

    //出口文件，可配置多个或单个
    output : {
        //出口生成地址
        path : __dirname + '/dist',
        //生成文件名
        filename : "bundle.js",
        //公用的临时缓存路径
        publicPath: "./assets/"
    },
    
    //解析
    module : {
        rules : [
            {
                //解析js文件,支持es6 翻译成es5
                test : /\.js$/,
                use : [{
                    loader : 'babel-loader',
                    options : {
                        //配合tree-shaking在编译转化es6代码时不把 import export 转换为cmd的 module.export
                        presets : [['es2015',{modules: false}]],
                    },
                }]
            },
            {
                //解析css文件 并且添加兼容样式
                test : /\.(css|scss)$/,
                use : ['style-loader','css-loader','postcss-loader','sass-loader']
            },
            {
                //解析css文件 并且添加兼容样式
                test : /\.vue$/,
                use : ['vue-loader']
            },
            {   
                //解析图片文件
                test : /\.(png|jpg|gif)$/,
                use : [{
                    loader : 'url-loader?limit=8192&name=images/[name].[ext]'
                }],
            }, 
            {   
                //解析字体图标
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                use : [{
                    loader : 'url-loader?name=fonts/[name].[ext]'
                }],
            }, 
            {   
                //解析html
                test: /\.html$/,
                use : [{
                    loader : 'html-loader'
                }],
            }, 
            {   
                //解析音频播放
                test: /\.(mp4|ogg)$/,
                use : [{
                    loader : 'url-loader'
                }],
            }
        ]
    },

    //构建模式
    devtool : 'cheap-module-eval-source-map',

    //webpack-dev-server配置 webpack的服务器配置
    devServer : {
        //端口号
        port : port,
        // --告诉服务器从哪里提供内容。这只有在您想要提供静态文件时才需要。例如图片
        contentBase : path.join(__dirname, 'src'),
        // --使用HTML5 History API时，系统可能会放送index.html网页来取代404回应
        historyApiFallback : true,
        // --隐藏webpack打包是的信息
        noInfo : true,
        // --也是静态文件的目录， 相当于 output.publicPath
        publicPath : "/assets/",
        // --使用代理，需要 http-proxy-middleware  代理包,连接后台接口的时候使用
        // proxy: {
        //     '/users/*': {
        //         target:"http://192.168.2.113:3000/", //测试地址
        //         // target:"http://10.118.232.44:1112/", //空白
        //         // target: 'http://10.118.206.58:8080/',//文军,
        //     }
        // },
    },
    resolve:{
      extensions: ['.js', '.css', '.scss','.vue'],
      alias: {
        'vue$': path.resolve(__dirname,'./node_modules/vue/dist/vue.js'),
        'vue-router$':path.resolve(__dirname,'./node_modules/vue-router/dist/vue-router.js'),
        'src': path.resolve(__dirname, '../src'),
        'assets': path.resolve(__dirname, '../src/assets'),
      }
    },
    //插件
    plugins : [
        //热更新
        new webpack.HotModuleReplacementPlugin(),
        //允许错误不打断编程
        new webpack.NoEmitOnErrorsPlugin(),
        //加载兼容样式配置
        new webpack.LoaderOptionsPlugin({
            debug: false,
            options: {
                postcss: [
                    autoprefixer()
                ],
            },
        })
    ],

}