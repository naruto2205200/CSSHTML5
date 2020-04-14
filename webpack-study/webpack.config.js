const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html'
})
module.exports = {
    //mode用来指定构建模式 ： development 开发模式，production 生产模式（上线时使用）
    mode: 'development',
    // // 入口
    // entry:{},
    // // 出口
    // output:{}
    plugins: [
        htmlPlugin
    ]
}