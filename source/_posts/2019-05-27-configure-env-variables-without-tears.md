---
title: 不再为折腾环境变量而哭泣
catalog: true
date: 2019-05-27 16:25:07
subtitle: create-react-app 环境变量
header-img:
tags: create-react-app
---

create-react-app 提供了丰富的配置环境变量的方式，比如，可以创建 .env, .env.development, .env.production 三个文件：
* .env ： 默认变量
* .env.development: 开发环境变量
* .env.production: 线上环境变量

上面的结构很适合只需要区分开发环境和线上环境的业务场景，也只能适用于这种场景。而实际的情况可能更加复杂，比如，我现在所负责的项目，线上环境就有四个，分别是 dev/qa/stg/prod（称为 stack）。cra 提供的方法完全不够用。事实上，create-react-app 在 github 上的 issue 中就有讨论过相关的 topic，当然，目前还没有定论。否则，我也不会在折腾半天无果后，只能自己造轮子，然后写下这篇造后感。

## idea of spring
**遇到前端工程问题，不妨看看后端有什么现成的解法**。刚好我用过 spring，它引入一种概念叫做 profile，一个 sprint app 可以包含多个 profile，每个 profile 是一份配置文件。可以在主配置文件中设置当前启用哪个 profile。比如，对于我们的项目，可以配置 dev/qa/stg/prod 四个 profile。实际应用中，spring app 从环境变量中读取当前启用的 profile 的名字。比如，虚拟机中设置一个环境变量 profile=dev，则 dev profile 被启用。

## cra 能做什么
看完 spring 的 idea，来分析下 create-react-app 的现状。
1. cra 预置 NODE_ENV 作为环境变量，当运行 start 命令时，值为 development，当运行 build 时，值为 production。但我们要区分 4 个线上环境，所以，无用。
2. cra 设置了复杂的配置文件优先级策略，详见官网，结论依然是无用。我个人倾向于简洁直白，每个环境需要的变量最好全部写清楚，不需要**继承**或者**组合**。

所以，cra本身的高级机制我们统统不用，只需要知道 cra 会读取 .env 文件，无论是 development 还是 production。

## 模仿 spring
先准备好四个 profile 文件：
* .env.dev
* .env.qa
* .env.stg
* .env.prod
.env.dev 中内容，其他 profile 结构类似：
```ini
api_path: http://api.dev.com
```
然后，根据环境变量 profile 切换 .env，即动态生成 .env 文件。

env.js
```js

const fs = require('fs')
const ini = require('ini')
const dotenv = require('dotenv')
const path = require('path')

function load() {
  if (process.env.profile) {
    return dotenv.config({ path: path.join(__dirname, '..', `.env.${process.env.profile}`) })
  }
  return dotenv.config()
}

const result = load()

if (result.error) {
  throw result.error
}

console.log(result.parsed)

fs.writeFileSync('./.env', ini.stringify(result.parsed))
```

修改 package.json 中 start 和 build 命令：

```json
  "start": "profile=dev node env.js && react-scripts start",
  "build": "node env.js && react-scripts build",
```

可以看到我为本地开发配置的 profile 是 dev。production 上所用的 profile 以构建系统（jenkins虚拟机）所提供的 profile 为准。

## 可以提升的点。
未来，如果有时间的话，还可以做一些提升。

相对容易的，在 build 结束后删除 .env 文件。简单的做法是, build 完成后再调用删除命令。
```json
"build": "node env.js && react-scripts build && node env.js cleanup",
```

复杂一点的，完全弃用 .env 文件，通过子进程来调用 build 脚本，同时设置环境变量。

```js
require('child_process').exec('api_path=xxx react-scripts build')
```

## 总结和感想
cra 官方只提供了区分开发和线上的环境变量管理办法，其实一开始就已经表明了他们绝对无法支持多线上环境这个现实，但是我还是愚蠢的尝试了几个小时，试图从多种配置文件的组合中寻找一种可以利用的模式，现在看起来这注定是要失败的。

我现在所“发明”的这种方式，其实就是简单的改变了思路：既然 cra 不支持多 profile，那我利用外部脚本按需生成 env 文件然后提供给 cra 不是一样解决问题吗？当然，到底要利用 lib 本身还是外部服务（脚本，其他lib）来解决问题，要综合考虑时间成本，可靠性。
