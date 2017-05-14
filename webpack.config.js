'use strict'

const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    //公共文件存放地址
    context : __dirname + '/src',

    //入口文件，可配置多个或单个
    entry : {
        app : './app'
    },

    //出口文件，可配置多个或单个
    output : {
        //出口生成地址
        path : __dirname + '/dist/assets/',
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
                test : /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  //resolve-url-loader may be chained before sass-loader if necessary
                  use: ['css-loader', 'postcss-loader']
                })
            },
            {
                //解析css文件 并且添加兼容样式
                test : /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  //resolve-url-loader may be chained before sass-loader if necessary
                  use: ['css-loader','postcss-loader','sass-loader']
                })
            },
            {
                //解析css文件 并且添加兼容样式
                test : /\.vue$/,
                use : [{
                    loader:'vue-loader'
                }]
            },
            {   
                //解析图片文件
                test : /\.(png|jpg|gif)$/,
                use : [{
                    loader : 'url-loader?limit=0&name=images/[name].[ext]'
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

    resolve:{
      extensions: ['.js', '.css', '.scss','.vue'],
      alias: {
        'vue$': path.resolve(__dirname,'./node_modules/vue/dist/vue.js'),
        'vue-router$':path.resolve(__dirname,'./node_modules/vue-router/dist/vue-router.js'),
        'src': path.resolve(__dirname, '../src'),
        'assets': path.resolve(__dirname, '../src/assets')
      }
    },

    //插件
    plugins : [
        // 位于开发环境下
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        //抽出公共js
        new webpack.optimize.CommonsChunkPlugin({
            name:'common', // 注意不要.js后缀
            filename: "commons.js",
        }),
        //抽出公共样式
        new ExtractTextPlugin('style.css'),
        //兼容样式
        new webpack.LoaderOptionsPlugin({
            debug: false,
            options: {
                postcss: [
                    autoprefixer()
                ],
            },
        }),
        //模板
        new HtmlWebpackPlugin({
            template: './prod.html',
            filename: '../index.html',
            inject: 'body'
        }), 
        //压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: true
        })
    ],

}