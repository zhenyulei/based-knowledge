---
sidebarDepth: 1
---

> 执行上下文指的是代码在执行时的运行环境或作用域。

### 执行上下文类型：

- 1、全局执行上下文
  任何不在函数内部的代码都在全局上下文中，执行两件事：
  - （1）创建全局的 window 对象
  - （2）设置 this 的值等于全局对象
    一个程序中只有一个全局执行上下文
- 2、函数执行上下文：函数在被调用时创建
- 3、Eval 函数执行上下文

### 执行栈

后进先出的栈，执行程序时，会创建全局的执行上下文并且压入当前执行栈，每当调用一个函数，就会为该函数创建一个新的执行上下文并压入栈。

### 创建执行上下文

（1）创建阶段【调用函数时，在执行函数之前】

- 1、创建作用域链
- 2、创建 variable object，并在 variable object 上创建变量、函数和参数

  - 1、创建 arguments object
  - 2、扫描上下文获取函数声明，找到的新函数，在 variable object 中创建对应属性，已有函数名则覆盖；
  - 3、扫描上下文获取变量声明，找到新的变量，在 variable object 中创建新的属性，初始化为 undefined，已存在则忽略

例如代码：

```js
function foo(i) {
  var a = "hello";
  var b = function privateB() {};
  function c() {}
}

foo(22);
```

在调用 foo(2)时，创建上下文阶段：

```js
fooExecutionContext = {
    scopeChain: { ... },
    variableObject: {
        arguments: {
            0: 22,
            length: 1
        },
        i: 22,
        c: pointer to function c()
        a: undefined,
        b: undefined
    },
    this: { ... }
}
```

- 3、确定 this 的值
  - 1、在全局执行上下文中，this 的值指向全局对象。(在浏览器中，this 引用 Window 对象)。
  - 2、在函数执行上下文中，this 的值取决于该函数是如何被调用的。如果它被一个引用对象调用，那么 this 会被设置成那个对象，否则 this 的值被设置为全局对象或者 undefined（在严格模式下）

```js
let foo = {
  baz: function() {
    console.log(this);
  },
};

foo.baz(); // 'this' 引用 'foo', 因为 'baz' 被
// 对象 'foo' 调用

let bar = foo.baz;

bar(); // 'this' 指向全局 window 对象，因为
// 没有指定引用对象
```

（2）执行阶段

- 1、分配值，引用函数和解释、执行代码

代码执行后

```js
fooExecutionContext = {
    scopeChain: { ... },
    variableObject: {
        arguments: {
            0: 22,
            length: 1
        },
        i: 22,
        c: pointer to function c()
        a: 'hello',
        b: pointer to function privateB()
    },
    this: { ... }
}
```

### 题目练习

以下代码打印结果是什么？

```js
(function() {
  console.log(typeof foo);
  console.log(typeof bar);

  var foo = "hello";
  var bar = function() {
    return "world";
  };

  function foo() {
    return "hello";
  }
})();
```

**回答：**

上面为自执行函数，在函数执行前，先创建执行上下文，先处理函数声明，声明了 foo 函数，然后处理变量声明，虽然有 var foo，因为 foo 之前已经声明过函数，所以变量声明不在生效，而 bar 时变量声明为 undefined，所以最终的结果是：
`function，undefined`

### 相关文章

- [JavaScript 中的执行上下文](https://segmentfault.com/a/1190000018001052)
- [理解 JavaScript 中的执行上下文和执行栈](https://juejin.cn/post/6844903682283143181)
