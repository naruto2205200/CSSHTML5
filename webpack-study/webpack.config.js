// require的内容相当于构造器，在下面使用的地方 new
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html'
})
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    //mode用来指定构建模式 ： development 开发模式，production 生产模式（上线时使用）
    mode: 'development',
    // // 入口
    // entry:{},
    // // 出口
    // output:{}
    plugins: [
        htmlPlugin,
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            // loader的执行顺序是从后往前，顺序不能错
            {test: /\.css$/,use:['style-loader','css-loader','postcss-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.jpg|png|gif|bmp|ttf|svg$/, use:['url-loader?limit=16940']},
            {test: /\.js$/,use: 'babel-loader',exclude:/node_modules/},
            {test: /\.vue$/,loader:'vue-loader'}
        ]
    }
}