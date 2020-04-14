# 2020-04-13 
## 安装 babel
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node
npm install --save @babel/polyfill 

项目根目录创建文件babel.config.js
const presets = [
	[
		"@babel/env",{
			targets:{edge:"17",firefox:"60",chrome:"67",safari:"11.1"}
		}
	]
]
module.exports = {presets}

## webpack相关
webpack 是一个现代 JavaScript 应用程序的静态模块打包器，把一些浏览器不能直接运行的拓展语言转换为浏览器可以运行的语言
在项目根目录执行命令快速初始化一个包管理文件，即 package.json
npm init -y 
创建一个src文件夹，代码都放在这里

# 2020-04-13 
## webpack的使用
安装jquery
npm i jquery
通过webpack配置 jquery
1、安装webpack
npm install webpack webpack-cli -D
2、在项目根目录创建名为 webpack.config.js的webpack配置文件
3、在webpack.config.js文件中配置内容
	module.exports = {
		mode: 'development'//mode用来指定构建模式 ： development 开发模式，production 生产模式（上线时使用）
	}
4、在package.json 配置文件中的scripts 节点下，新增dev脚本如下：
	"scripts":{
		"dev":"webpack" // script节点下的脚本，可以通过npm run 命令执行
	}
5、在终端执行 npm run dev 命令，启动webpack 进行项目打包

## webpack 的入口和出口
webpack有默认的入口和出口文件，如果需要修改，则需要自己配置
### 入口
默认入口文件为src  下的index.js 文件

### 出口
默认出口文件为dist 下的main.js 文件


## 自动打包
每次修改代码都需要重新运行webpack打包功能，不方便，麻烦
需要配置自动打包功能
1、运行 npm install webpack-dev-server -D 安装支持项目自动打包的工具
2、修改配置文件：package.json 中的dev的命令
	"scripts":{
		"dev":"webpack-dev-server" // script节点下的脚本，可以通过npm run 命令执行
		
	}

	open 表示自动打开浏览器
	host 表示配置ip地址
	port 表示端口号
	"dev": "webpack-dev-server --open --host 127.0.0.1 --port 8888"
3、将src下的index.html 中的script脚本的引用路径，修改为“/buldle.js”
4、运行npm run dev 重新进行打包
5、浏览器中访问 http://localhost:8080 地址，查看自动打包效果

## package.json 文件 devDependencies 里面的插件只用于开发环境，不用于生产环境，而 dependencies 是需要发布到生产环境的

## webpack 插件
### 配置html-webpack-plugin生成预览页面
1、运行 npm install html-webpack-plugin -D 命令，安装插件
2、修改webpack.config.js文件头部区域，添加如下配置信息

const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
module.exports = {
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
		new HtmlWebpackPlugin({template: './src/index.html'})
	]
}
也可以
const htmlPlugin = new HtmlWebpackPlugin({
	template: './src/index.html', // 指定要用到的模板文件
	filename: 'index.html' // 指定生成的文件的名称，该名称存在与内存中，在目录中不显示
})
module.exports = {
	plugins: [
		htmlPlugin
	]
}

## webpack 加载器
通过loader.js 打包非js模块，webpack默认只能打包.js结尾的文件，非.js文件无法处理，需要借助loader.js加载器才能正常打包，否则报错
less-loader  打包.less 相关文件
scss-loader  打包.scss 相关文件
url-loader 打包css文件中和url路径相关的文件
ts-locader 打包TypeScript文件


npm install --save-dev url-loader
npm install --save-dev ts-loader
npm install --save-dev scss-loader
npm install --save-dev less-loader
npm install --save-dev css-loader