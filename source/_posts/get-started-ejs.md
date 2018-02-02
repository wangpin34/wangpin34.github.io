---
title: ejs 入门
catalog: true
date: 2018-02-02 13:21:32
subtitle:
header-img:
tags:
---
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
