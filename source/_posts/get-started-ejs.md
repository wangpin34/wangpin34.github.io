---
title: ejs 入门
catalog: true
date: 2018-02-02 13:21:32
subtitle: 熟练掌握一种模板引擎可以极大的提高页面开发效率
header-img: 
tags: ejs
---
## 为什么要学习模板引擎
在我年轻的时候，经常听长辈们前辈们说，先不要管是什么，集中精力狠狠地学一阵，自然能有所收获。在很长一段时间，我对这句话深信不疑并身体力行。说实话，在付出了比较可观的精力甚至财力之后，确实能有所收获。但也仅此而已，得到的很多知识和经验，往往并无太多实际意义。

随着年岁的增长，可支配的时间大幅度减少，同时精力也不如年轻时旺盛。原本粗放的学习方式显得更加不合时宜。所以，现在我更多的问自己，这个东西对我有用吗？再好的知识，如果对我的个人提升无用，那也是没有意义的。

回到本文主题，我之所以认为模板引擎很重要，原因无非是，它是一门收益极高的知识。首先，它能将内容和html分离，想象这个特性的应用场景。假如有一个页面要给 20 个国家做国际化，那我们只需要准备 20 份 local 文件，一份模板，搭配对应的脚本，就能直接生成 20 个对应的 html 文件。 以后支持别的语言，也只需要新增 local 文件而已。如果这个项目的参与者不是程序员，那也没关系，他们所要关注的不是复杂多变的css和html，仅仅是 local 文件罢了。

即使现今 react/vuejs/angular 大行其道，模板引擎依然有它的用武之地。至少，这个星球上还有那么多站点依然是内容展示而非 webapp，而即便是 webapp 也有对应的一些内容页面，这些，都是模板引擎可以发光发热的舞台。

今天的主角是 ejs，开发者是大名鼎鼎的 tj。我的博客引擎 hexo 也默认支持 ejs 作为模板。

## 安装

ejs 是一个 js 模板引擎，语法简单，集成方便，被很多框架所使用。

通过 npm 安装：
```
npm i ejs -S
```

也可以下载[独立版本](https://github.com/mde/ejs/releases/latest)。

## 基本语法要素
ejs 的语法比较简单： 初始化模板->加载数据->渲染
```javascript
//str 模板内容，一般从 .ejs 模板文件读取
//options 一些配置，比如分隔符，缓存，debug 输出，等等
var template = ejs.compile(str, options);

//data 待渲染的数据
var html = template(data);
```

如果不需要复用模板，可以直接生成 html
```javascript
ejs.render(str, data, options);
```

实际的例子：
template.ejs
```ejs
<% if (user) { %>
  <h2><%- user.name %></h2>
<% } %>
```
index.js
```javascript
var ejs = require('ejs');
var fs = require('fs');

var str = fs.readFileSync('template.ejs', {encoding: 'utf8'});
var data = { user: { name: 'wangpin', age: 30 } };
var template = ejs.compile(str);
var result = template(data);

console.log(result);
```

输出结果:
```
 <h2>wangpin</h2>
```

## 标签
上面的 template 中，使用到 3 种标签。
* <% 程序标签，控制流程，没有输出。比如这里的 if (user)
* <%- 输出标签，不做转义
* %> 结束标签

还有其他 4 种类型，这里一一介绍。
* <%= 输出标签，转义 html 字符，比如 < >
* <%# 注释，不输出任何内容
* <%% 输出 **<%**
* -%> 结束便签，并删除最近的一个空行


## 包含 Includes
模板可以引用另一个模板的内容。
```ejs
<ul>
  <% users.forEach(function(user){ %>
    <%- include('user/show', {user: user}); %>
  <% }); %>
</ul>
```
两个要点：
* 不能转义模板内容，所以这里**必须**使用 **<%-**。
* 初始化父 template 的时候，options 中必须指定 filename。

简单的例子：
subTemplate.ejs
```
<a href="#"><%- user.hometown %></a>
```
template.ejs
```
<% if (user) { %>
  <h2><%- user.name %></h2>
  <%- include('./subTemplate', {user: user}); %>
<% } %>
```

test.js
```javascript
var ejs = require('ejs');
var fs = require('fs');

var str = fs.readFileSync('template.ejs', {encoding: 'utf8'});
var data = { user: { name: 'wangpin', age: 30, hometown: 'weinan' } };
// 指定 filename 为 template
var template = ejs.compile(str, { filename: 'template'});
var result = template(data);

console.log(result);
```

指定 filename 是为了在解析 include 的时候确定 subTemplate 的相对路径。

> Includes are relative to the template with the include call


## 定制分隔符
默认使用的分隔符是 **%**, 如果想要换成其他字符，可以在全局，或者某个 template 上做单独的配置。

```javascript
var ejs = require('ejs'),
    users = ['geddy', 'neil', 'alex'];

// Just one template
ejs.render('<?= users.join(" | "); ?>', {users: users},
    {delimiter: '?'});
// => 'geddy | neil | alex'

// Or globally
ejs.delimiter = '$';
ejs.render('<$= users.join(" | "); $>', {users: users});
```

## 参考文档
[http://ejs.co/](http://ejs.co/)
