# 2020-04-13 
## 安装 babel
### babel：把JavaScript中的高级语法转换为es5，让低端运行环境能够识别并执行
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
		mode: 'development'//mode用来指定构建模式 ： development 开发模式，production 生产模式（上线时使用，会把相关文件进行压缩）
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

 —D 是--save-dev 的缩写


npm install url-loader -D
npm install ts-loader -D
npm install sass-loader node-sass -D
npm install less-loader less -D
npm install css-loader -D
npm install style-loader -D

### 添加css相关的loader
在webpack.config.js的module 下的rules 数组中，添加loader规则：
module:{
	rules:[
		{test:/\.css$/,use:['style-loader','css-loader']},
		{test:/\.less$/,use:['style-loader','css-loader','less-loader']},
		{test:/\.scss$/,use:['style-loader','css-loader','sass-loader']}
	]
}

### postCSS 自动添加css的兼容前缀
npm install postcss-loader autoprefixer -D 
在根目录创建postcss的配置文件 postcss.config.js 并初始化如下配置：
const autoprefixer = require('autoprefixer')
module.exports={
	plugins:[
		autoprefixer
	]
}
在webpack.config.js 的module 的rules中，修改css的loader ,多了一个 postcss-loader
module:{
	rules:[
		{test:/\.css$/,use:['style-loader','css-loader','postcss-loader']}
	]
}

### 打包样式表中的图片和字体文件
npm install url-loader file-loader -D
在webpack.config.js中添加rules
module:{
	rules:[
		{test:/\.jpg|png|gif|bmp|ttf|svg$/,
		use:['url-loader?limit=16940']} // limit=16940 表示指定图片的大小，单位是字节（byte），只有小于limit大小的图片才会被转为base64图片
	]
}
### 打包js文件中的高级语法 ES6+ babel相关的配置
1、安装babel转换器相关的包：npm install babel-loader @babel/core @babel/runtime -D
2、安装babel语法插件相关的包：npm install @babel/preset-env @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties -D
3、在根目录下创建babel的配置文件babel.config.js 并初始化基本配置：
module.exports = {
	presets: ['@babel/preset-env'],
	plugins: ['@babel/plugin-transform-runtime','@babel/plugin-proposal-class-properties']
}
4、在webpack.config.js rules中添加loader：
{test: /\.js$/,use: 'babel-loader',exclude:/node_modules/} // 排除node_modules 下的js文件

## Vue 单文件组件
安装 Vue 文件提示插件：Vetur
需要安装vue组件的加载器
1、npm install vue-loader vue-template-compiler -D 
2、在webpack.config.js rules中添加loader：
	const VueLoaderPlugin = require('vue-loader/lib/plugin')
	{test: /\.vue$/,loader:'vue-loader'}

	在Plugins中添加插件
	plugins:[
		//... 其他插件
		new VueLoaderPlugin() //确保引入这个插件
	]

### 在webpack中使用vue
1、npm install vue -s  安装
2、在src 的index.js入口文件中，通过 import Vue from 'vue' 来导入vue构造函数
3、创建vue的实例对象，并指定要控制的el区域

	import Vue from 'vue'
	import App from '../components/App.vue'
	const vm = new Vue({
		el: '#app',
		//通过render函数，把指定的组件渲染到el区域中，在webpack 项目的入口文件中new Vue中只使用render，不使用别的什么template之类的属性
		render: h=>h(App)
	})

### webpack 打包发布
在 package.json 中添加配置
scripts:{
	"build":"webpack -p",
	"dev": "webpack-dev-server --open --port 8888"
}
执行命令：npm run build  进行webpack的相关打包和发布（相当于执行了webpack -p 命令），读取 webpack.config.js 文件的相关配置，会把打包好的信息放入dist文件夹下，可以预先把dist文件夹删除掉
dist文件夹下就是完整的项目了，把打包好的dist文件夹用来上线就可以了

## 2020-04-17  Vue脚手架的使用
### Vue脚手架
npm install -g @vue/cli
安装完成之后再cmd中vue -V 查看是否安装成功，有版本号则说明成功
### 基于脚手架创建项目的方式
1、基于交互式命令方式
vue create my-project
2、基于图形化界面的方式
vue ui

#### 1、基于交互式命令方式
#### 创建时会选择一些功能，选择自定义： Manually select features
#### 然后选项通过上下键选择，然后空格键来打*号选中需要安装的功能，选择完成之后回车下一步
#### use history mode for router? 这里选择No ，一般都使用hash路由，而不是历史路由
#### 接下来选择ESLint + Standard config  标准
#### ESLint on save
#### In dedicated config files
#### Save this as a preset for future projects? 是否保存这些选项为一个模板，以后的项目都这样执行  这里选择N

#### 2、基于图形化界面的方式
#### 基于交互式命令方式 有点麻烦
#### cmd 中输入： vue ui 打开可视化页面进行相关操作
在package.json.js 配置信息，自动打开浏览器首页（不推荐）
 "vue": {
    "devServer": {
      "port": 8888,
      "open": true
    }
  }


推荐在vue.config.js文件中配置服务信息



#### 项目目录：public 静态资源，src：页面代码

### 使用Element-UI
#### 安装vue-cli-plugin-element 插件
#### 在vue ui 可视化界面，安装插件，选择import on demand 不要选择Fully import（这是默认的，需要重新选择）

### 在vue ui 可视化界面 安装axios依赖
### 安装 less-loader 和less 两个开发依赖以支持less