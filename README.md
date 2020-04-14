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
在项目根目录执行命令快速初始化一个包管理文件，即 package.json
npm init -y 
创建一个src文件夹，代码都放在这里