---
title: You need seamless-immutable to refactor your react app
catalog: true
date: 2019-07-04 16:22:59
subtitle:
header-img:
tags:
summary: It's not a required skill for developing an app which writen in reactjs. If you are sure the state structure is simple enough and you are always be carefully while doing the mututation. However, if there is a piece of knowledge that make it easy and safe while developing an app, who not give it a chance?
---
# 说明 (You are free to go to next section if English is not the problem)
**本文首发于 Medium，作者最近在练习英文写作，身在职场，谋生之技，请见谅**。
下面是简单的总结：
对于 react app 来说，inmutable 并不一定是必须的。如果你的 state 比较简单，而且在更新 state 时足够小心，你能避免本文开始列出的问题。但是，如果有一种使用简单的技术能够让你从这种小心的节奏中解脱出来，让你专注于处理其他更有价值的问题，不是更好吗？
# Why you need it?
There are two major reasons why you need to use seamless-immutable in your react application.
1. It's a bad practice to update props inside the component because it leads to much more problems than your thoughts(It will be a big topic but now it's known to all so I think I don't need to explain that, at least in this article). So, from the tech point of view, **immutable**  is better.
2. To save the effort of differing props, the pure component does only compare the references of each property in props, called **shallowly compares**. If the references are the same, the re-render not happen. In using object or array we must very carefully to re-generate a new copy of them if the data changed. That's the reason why **spread** operator is introduced by **redux** and is highlighted.

```javascript
...
case SUCCESS:
  return { ...state, xxx }
...
```

Read more in [purecomponent](https://reactjs.org/docs/react-api.html#reactpurecomponent)

## And why seamless-immutable?
**seamless-immutable** is a simple implementation of immutable. Less size of the bundle, less time you need to learn how to do mutation. And, the very great side is, you can visit the immutable data just like a primitive object/array. No more operators, grammar.  

#  Get started
## How to create the immutable copy of an object/array?
```javascript
Immutable(object)
Immutable(array)
```
##  How to create the mutable copy(for easy modification without using replace/set/merge methods) of an immutable data?
```javascript
Immutable.asMutable(object)
```
additional options:
```javascript
Immutable.asMutable(object, { deep: true})
```
This will create a mutable copy for each property(or elements in an array). That means all properties will be new in the mutable copy(If deep = true then all nested property will be new generated as well).  And that will leads to a performance issue in the application which has huge and complicated data because that react component will be re-render although it's not necessary.

The better idea is to only mutate the property when it's necessary. For example, there is an address list:
```javascript
var addrs = Immutable([
  { id: 1, name: "wangpin" },
  { id: 2, name: "mona", children: [1, 2] }
])
var newAddrs = Immutable.set(addrs, 0, Immutable.merge(addrs[0], { name: 'remind'}))
```

> Like somebody said, every coin has two sides: Use 'asMutable' is easy for usual modifications like what you did before involving the concept `immutable', but it's bad for performance(for the big app). Try to update the object carefully with the operators provided by immutable is hard a lot to beginners, but it's good or required and much worth to do in a big app. 

#  So let's learn how to update it as little as possible
They are **merge**, **replace**, **set & setIn**, **update & updateIn**, **without**. 
1. Only **set & setIn** can be applied on both object and an array, others only work on an object.
2. **merge**, **replace**, **set & setIn** support additional parameters **deep:true** to perform a deep operation. Others don't.

ps. I will not introduced the method **get** and **getIn** since they are not about mutation.
## merge
```javascript
var obj = Immutable({status: "good", hypothesis: "plausible", errors: 0});
Immutable.merge(obj, {status: "funky", hypothesis: "confirmed"});
// returns Immutable({status: "funky", hypothesis: "confirmed", errors: 0})

var obj = Immutable({status: "bad", errors: 37});
Immutable.merge(obj, [
  {status: "funky", errors: 1}, {status: "groovy", errors: 2}, {status: "sweet"}]);
// returns Immutable({status: "sweet", errors: 2})
// because passing an Array is shorthand for
// invoking a separate merge for each object in turn.
```
## replace
```javascript
var obj1 = Immutable({a: {b: 'test'}, c: 'test'});
var obj2 = Immutable.replace(obj1, {a: {b: 'test'}}, {deep: true});
// returns Immutable({a: {b: 'test'}});
obj1 === obj2
// returns false
obj1.a === obj2.a
// returns true because child .a objects were identical
```
## set & setIn
**Only set & setIn can be applied on an array**.
```javascript
var obj = Immutable({type: "parrot", subtype: "Norwegian Blue", status: "alive"});
Immutable.set(obj, "status", "dead");
// returns Immutable({type: "parrot", subtype: "Norwegian Blue", status: "dead"})
```
When called with an Immutable Array, the property parameter is the index to be changed:
```javacript
var array = Immutable(["hello", "world"]);
var mutatedArray = Immutable.set(array, 1, "you");

mutatedArray // ["hello", "you"]
```
Like set, but accepts a nested path to the property.
```javascript
var obj = Immutable({type: {main: "parrot", sub: "Norwegian Blue"}, status: "alive"});
Immutable.setIn(obj, ["type", "sub"], "Norwegian Ridgeback");
// returns Immutable({type: {main: "parrot", sub: "Norwegian Ridgeback"}, status: "alive"})

var array = Immutable([["one fish", "two fish"], ["red fish", "blue fish"]]);
var mutatedArray = Immutable.setIn(array, [1, 1], "green fish");

mutatedArray // [["one fish", "two fish"], ["red fish", "green fish"]]
```
## update & updateIn
Returns an Immutable Object with a single property updated using the provided updater function.
```javascript
function inc (x) { return x + 1 }
var obj = Immutable({foo: 1});
Immutable.update(obj, "foo", inc);
// returns Immutable({foo: 2})
```
All additional arguments will be passed to the updater function.
```
function add (x, y) { return x + y }
var obj = Immutable({foo: 1});
Immutable.update(obj, "foo", add, 10);
// returns Immutable({foo: 11})
```
**updateIn** like **setIn** that it accetps a nested path to be property.
```
function add (x, y) { return x + y }
var obj = Immutable({foo: {bar: 1}});
Immutable.updateIn(obj, ["foo", "bar"], add, 10);
// returns Immutable({foo: {bar: 11}})

```
## without
Returns an Immutable Object excluding the given keys or keys/values satisfying the given predicate from the existing object.

Multiple keys can be provided, either in an Array or as extra arguments.
```javacript
var obj = Immutable({the: "forests", will: "echo", with: "laughter"});
Immutable.without(obj, "with");
// returns Immutable({the: "forests", will: "echo"})

var obj = Immutable({the: "forests", will: "echo", with: "laughter"});
Immutable.without(obj, ["will", "with"]);
// returns Immutable({the: "forests"})

var obj = Immutable({the: "forests", will: "echo", with: "laughter"});
Immutable.without(obj, "will", "with");
// returns Immutable({the: "forests"})

var obj = Immutable({the: "forests", will: "echo", with: "laughter"});
Immutable.without(obj, (value, key) => key === "the" || value === "echo");
// returns Immutable({with: "laughter"})
```

# Summary of seamless-immutable
1. **asMutable** is the easiest way to perform modification, but it harms performance sometimes.
2. All methods for mutating object/array returns a new immutable copy. If you have to perform more than one mutation on the data,  please make sure every mutation works on the newer copy.
```
const original = Immutable(xxx)
const newer1 = Immutable.replace(original, xxx)
const newer2 = Immutable.replace(newer1, xxx)
```

Thanks for your reading.
