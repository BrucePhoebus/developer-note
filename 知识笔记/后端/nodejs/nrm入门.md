# nrm入门

## 概念

	开发的npm registry 管理工具 nrm, 能够查看和切换当前使用的registry
	nrm是一个管理npm的工具

## nrm的安装

	npm install -g nrm

## 常用命令
	
	$ nrm ls　　// 查看所有的支持源（有*号的表示当前所使用的源,以下[name]表示源的名称）
	$ nrm use [name]　　// 将npm下载源切换成指定的源
	$ nrm help　　// 查看nrm帮助
	$ nrm home [name]　　// 跳转到指定源的官网