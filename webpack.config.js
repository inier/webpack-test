// 导入路径包
var path = require('path');
var webpack = require('webpack');

// 用于将css样式打包成独立的文件
var ExtrackTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';
/*// 生产环境才需要用到的代码，比如控制台里看到的警告*/

// 项目相关
var project = "013";

// 入口文件
var entry = PRODUCTION
    ? ['./' + project + '/src/index.js']
    : [
        './' + project + '/src/index.js',
        'webpack/hot/dev-server', //调用热重载 hot
        'webpack-dev-server/client?http://localhost:8080' //添加webpack-dev-server客户端
    ];
var plugins = PRODUCTION
    ? [
        new webpack
            .optimize
            .UglifyJsPlugin(/*{ //代码压缩
                comments: true, //显示注释
                mangle: false, //取消代码混淆
                compress: {
                    warnings: true //在UglifyJs删除没有用到的代码时不输出警告
                }
            }*/),
        // new ExtrackTextPlugin('style.css') 根据内容生成hash值 所有分离文件的样式也会全部压缩到一个文件上
    ]
    : [
        new webpack.HotModuleReplacementPlugin() //全局开启代码热替换 如果是CLI这里则不用写
    ];

// css编译后的自动命名规则
const cssIdentifier = PRODUCTION
    ? '[hash:base64:8]'
    : '[path][name]---[local]';

// 在不将css单独打包成独立文件的情况下，采用css-loader后原本div的class会被hash所代替。
// hash名称可以在webpack.config.js里css的加载器里自定义。
const extractCSS = new ExtrackTextPlugin('css/[name].css?[contenthash:8]', {allChunks: true});
const inlineCssLoader = ['style-loader', `css-loader?localIdentName=${cssIdentifier}`];
const cssLoader = extractCSS.extract([`css?localIdentName=${cssIdentifier}`]);
const sassLoader = extractCSS.extract([`css-loader?localIdentName=${cssIdentifier}`, 'sass-loader']);

var htmlPlugins = [];

plugins.push(new webpack.DefinePlugin({
    DEVELOPMENT: JSON.stringify(DEVELOPMENT),
    PRODUCTION: JSON.stringify(PRODUCTION)
}));

plugins.push(extractCSS);
plugins.push(new HTMLWebpackPlugin({ // webpack 指定目录(package内设置)生成静态HTML文件
    filename: `index.html`,
    template: `./${project}/src/tpl/tpl-index.html`
}));

var cssLoaders = PRODUCTION
    ? [
        {
            test: /\.css$/,
            loader: cssLoader,
            exclude: "./node_modules/"
        }
    ]
    : [
        {
            test: /\.css$/,
            loaders: inlineCssLoader,
            exclude: "./node_modules/"
        }
    ];

module.exports = {
    externals: {
        'jquery': 'jQuery'
    },
    //打包代码的同时生成一个sourcemap文件，并在打包文件的末尾添加--->//# souceURL注释,注释会告诉JS引擎原始文件位置
    devtool: 'source-map',
    //入口文件
    entry: entry,
    output: {
        path: path.join(__dirname, project + '/dist'), // 指定打包之后的文件夹
        publicPath: '/' + project + '/dist/', // 指定资源文件引用的目录
        filename: PRODUCTION
            ? 'bundle.[hash:12].min.js'
            : 'bundle.js' // 指定打包为一个文件 bundle.js
            //filename: '[name].js' // 可以打包为多个文件
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loaders: ["html-loader"],
                exclude: "./node_modules/"
            },
            /*, {
                test: /\.css$/,
                loader: cssLoader,
                exclude: "./node_modules/"
            }*/
            {
                test: /\.scss$/,
                loader: sassLoader,
                exclude: "./node_modules/"
            }, {
                test: /\.js$/,
                loaders: ["babel-loader"],
                exclude: "./node_modules/"
            }, {
                test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
                //loaders: ["file-loader"],
                loaders: ["url-loader?limit=10000&name=img/[hash:6].[ext]"],
                exclude: "./node_modules/"
            }, {
                test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
                loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
            }
        ].concat(cssLoaders)
    },
    plugins: plugins
}