---
title: Golang：package 和 访问权限，以及其他基本知识总结
catalog: true
date: 2018-02-02 15:46:05
subtitle: 
header-img:
tags:
---
## 引子

新项目开始用 golang 作为后台开发语言，我之前主要使用 java 和 nodejs，所以本文大部分是以 java 或者 node 的过来人视角来审视 golang。不足之处，欢迎指正。

## 项目结构

如果项目只有一个 go 文件，那我们完全不用考虑模块问题。但这完全不现实。你必须把源代码按照职能，分割成不同的文件，再按照一定的规则组织起来。通常情况下，你还得安装很多外部 lib，简化开发流程。比如数据库，网络，自己实现相似的功能对于项目本身来说，没有太大意义 - 性价比太低。下面是一个 go 项目的目录结构。

```
-- apis
   | 
     - user.go
     - addresss.go
-- conf
   | 
     - conf.yml
-- main.go
-- router.go
-- routes.go
```
类似 java， 一个项目中只有一个 main 函数作为项目入口，通常定义在 main.go 中。

main.go
```
package main

func init() {}
func main() {}
```

运行项目
```
go build && ./*.exe
```
**将项目打包成可执行文件（windows平台，exe文件），然后运行 exe 文件。**

## 访问权限
go 没有类似 java 那样的设定访问权限的关键字如 public, protected, private， 而是通过资源命名方式来区分。首字母大写的即为 public，可以跨 package 调用。否则，只能本 package 调用。

```
type s1 struct {}
type S1 struct {}
func F1() {}
func f1() {}
```

## 安装 lib
学习任何语言，安装 lib 总是绕不开的话题。好在，golang 安装 lib 并不复杂。虽然没有类似 npm 这种高度中心化的 package 管理方案。
```
go get url
```
这里的url可以是任何能够提供 lib 安装包的地址。比如, 安装 beego：
```
$ go get github.com/astaxie/beego
```

lib 会安装在 {GO_PATH}/src 目录下, 按照 url 的路径，依次生成对应目录。
```
[GO_PATH]/src
  - github.com
    - astaxie
      - beego
```

如果需要代理才能上网，那就设置 http_proxy：
```
$ http_proxy=proxy.com:8080 go get code.google.com/p/go.crypto/bcrypt
```
设置系统环境变量也可以。
[How go configure go to use a proxy?](https://stackoverflow.com/questions/10383299/how-do-i-configure-go-to-use-a-proxy)

或者简单点，设置一个别名。
```
$ alias go='http_proxy=proxy.com:8080 go
```

最直接的办法，通过任何可行的方式将 lib 下载下来，放在 GO_PATH 下对应目录。

## 管理依赖
[dep](https://github.com/golang/dep) 或者 [godep](https://github.com/tools/godep)(**已经停止更新，不建议使用**)。 可以将依赖信息记载到配置文件，或者直接将依赖下载到项目根目录下面的 vendor 内。个人倾向于将依赖lib的源文件保存下来，作为项目的一部分。具体原因，如有必要我可以再开一篇文章细说。


## 常用的 lib（web service 开发），小知识
### web 框架，路由
* [beego](https://beego.me/) 最全面，包含路由，orm，数据库事务等企业级功能，但同时也最庞大。如果你的应用足够下，可以考虑自己搭建一个小脚手架。
* [mux](https://github.com/gorilla/mux) 轻量级路由方案


### yaml 文件解析
一篇介绍很全面的博文 [A tour of YAML parsers for Go](http://sweetohm.net/article/go-yaml-parsers.en.html)
* [go-gypsy](https://github.com/kylelemons/go-gypsy) 提供了很多 low level api，需要自己组织才能完全解析文件内容
* [yaml](https://github.com/go-yaml/yaml) 只能支持 flat map
