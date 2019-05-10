---
title: 提升软件开发体验的 tools
catalog: true
date: 2019-05-10 13:03:50
subtitle: 和 IDE 半毛钱关系也没有哦
header-img:
tags: 工具
---
# 楔子
自己平时做开发，经常会使用到一些工具，这其中，我特别青睐在线工具，一个很主要的原因是我不用安装他们。但记录下名字和地址还是必要的。

# 测试正则表达式

写正则的最大痛点在于测试，尤其是复杂的场景，很难去debug到底哪个地方写的有问题。如果这样一个工具，帮你检查格式规范，匹配结果，还能方便的保存和分享，你会心动吗？

[regex101](https://regex101.com/)
![](regex100.png)

以及 [regular expression MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions) 参考文档。

# Online Programing

[repl](https://repl.it/languages)

很多时候我只是想完成一项简单的任务，比如从文件中检索信息，format 文本，比如，将下面的美国 state 信息转化为对象或者数组。
```javascript
Alabama - AL
Alaska - AK
Arizona - AZ
Arkansas - AR
California - CA
Colorado - CO
Connecticut - CT
Delaware - DE
Florida - FL
Georgia - GA
Hawaii - HI
Idaho - ID
Illinois - IL
Indiana - IN
Iowa - IA
Kansas - KS
Kentucky - KY
Louisiana - LA
Maine - ME
Maryland - MD
Massachusetts - MA
Michigan - MI
Minnesota - MN
Mississippi - MS
Missouri - MO
Montana - MT
Nebraska - NE
Nevada - NV
New Hampshire - NH
New Jersey - NJ
New Mexico - NM
New York - NY
North Carolina - NC
North Dakota - ND
Ohio - OH
Oklahoma - OK
Oregon - OR
Pennsylvania - PA
Rhode Island - RI
South Carolina - SC
South Dakota - SD
Tennessee - TN
Texas - TX
Utah - UT
Vermont - VT
Virginia - VA
Washington - WA
Washington DC - DC
West Virginia - WV
Wisconsin - WI
Wyoming - WY
```

这么长的列表纯手工肯定麻烦又容易出错，写脚本的话，首先我手头得有台装了 nodejs/python 的电脑(因为这两个我最熟)。而且我得创建脚本文件，运行，可能还得调试一下。全部做完后，还得将脚本整理到合适的目录，或者删除。想一想，好像耗费了不少时间在准备开发环境上。

所以，一个随时在线的开发环境真是太好用了。更厉害的是，repl 支持很多流行的编程语言，比如我最爱的 nodejs/python/java，虽然用于做真实项目有点勉强，但作为工作需要的有益补充，足够了。

![](repl-nodejs.png)


# Codepen 和 codesanbox
[codepen](https://codepen.io/)

先说 codepen，可以在线编辑预览 html/css/js 的 app 很多，我个人比较喜欢 codepen 的 ui 风格。放一张首页看看：

![](codepen.png)

在 codepen 里，你可以随意的创建 pen（即包含 html/css/js 的小项目），在对应的工作台，你可以随时预览效果。当然，最好玩的是，如果你正在写一篇技术文章，你可创建一个 pen 以用来说明某些技术实现，然后， pen 嵌套在你的博客文章里。

就像下面这样：

<iframe height="265" style="width: 100%;" scrolling="no" title="gradient border" src="//codepen.io/wangpin/embed/EzaqKp/?height=265&theme-id=0&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/wangpin/pen/EzaqKp/'>gradient border</a> by wangpin
  (<a href='https://codepen.io/wangpin'>@wangpin</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## codesandbox
[codesandbox](https://codesandbox.io) 相比 codepen，增加了对流行框架的支持能力，比如在这里你可以非常容易的创建一个 react 项目，真正的零配置。作为 component 级别的开发工具，性能尚可。

<iframe src="https://codesandbox.io/embed/3293zy1mn5?fontsize=14" title="src/Step.jsx" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


(完)




