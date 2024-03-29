---
sidebarDepth: 1
---

## 默认参数

对于函数而言，经常会用到参数，关于参数的默认值通常都是写在函数体中，如在 ES5 的时候大家都会这么写：

```js
function foo(x, y) {
  y = y || "world";
  console.log(x, y);
}
foo("hello", "imooc");
foo("hello", 0);
```

当一个函数有很多参数涉及初始化的时候，这样写代码极其丑陋，所以在 ES6 中改变了对这种知识的写法：

```js
function foo(x, y = "world") {
  console.log(x, y);
}
foo("hello", 0);
```

:::tip TIP
函数参数是从左到右解析，如果没有默认值会被解析成 undefined

如果我们想让具体某个参数使用默认值，我们可以使用 undefined 进行赋值，如下段代码所示：
:::

```js
function f(x, y = 7, z = 42) {
  return x + y + z;
}
console.log(f(1, undefined, 43)); // 51
```

在 ES6 中我们不仅可以给参数默认赋值具体的数值，同时参数赋值支持参数的逻辑运算进行赋值，如下段代码所示：

```js
function f(x, y = 7, z = x + y) {
  return z * 0.5;
}

console.log(f(1, 7)); // 4
```

再看一个例子：

```js
function ajax(url, { body = "", method = "GET", headers = {} } = {}) {
  console.log(method);
}

ajax("http://www.imooc.com", {
  method: "POST",
});
```

### 函数的参数作用域

原因，函数的形参类似于定义的变量是和函数体内位于同一个作用域，

```js
let x = 1;
function foo(x, y = x) {
  console.log(x, y);
}
foo(2); //2 2
```

```js
function foo(x) {
  let x = 2;
}
//会报错，因为在函数的形参中，已经定义了x，所以函数体内无法再次定义，这里应该是let，因为var可以被覆盖
```

但是按照下面，形参中没有定义 x，则按照作用域链找到全局变量。函数内部的定义不会影响到参数的定义

```js
let x = 1;
function foo(y = x) {
  let x = 2;
  console.log(x, y);
}
foo(); //1
```

### 拓展

在函数体内，有时候需要判断函数有几个参数，一共有 2 个办法。在 ES5 中可以在函数体内使用 arguments 来判断。

```js
function foo(a, b = 1, c) {
  console.log(arguments.length);
}
foo("a", "b"); //2
```

然而在 ES6 中不能再使用 arguments 来判断了，但可以借助 Function.length 来判断。

```js
function foo(a, b = 1, c) {
  console.log(foo.length);
}
foo("a", "b"); // 1
```

细心的同学发现 Function.length 结果和 arguments 的结果不同！没错，Function.length 是统计第一个默认参数前面的变量数：

```js
function foo(a = 2, b = 1, c) {
  console.log(foo.length);
}
foo("a", "b"); // 0
```

## Rest 参数

在写函数的时候，部分情况我们不是很确定参数有多少个，比如求和运算，之前都是这么做的，因为 arguments 是类数组，所以要使用`Array.prototype.forEach.call`：

```js
function sum() {
  let num = 0;
  //或者使用Array.from将类数组转成数组 Array.from(arguments).forEach()
  Array.prototype.forEach.call(arguments, function(item) {
    num += item * 1;
  });
  return num;
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4)); // 10
```

其实在上面说过，这个代码在 ES5 中可以这么写，在 ES6 就不能这么写了，因为 arguments 的问题。现在需要这样写：

```js
function sum(...nums) {
  let num = 0;
  nums.forEach(function(item) {
    num += item * 1;
  });
  return num;
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4)); // 10
```

当然，Rest Parameter 也可以和其他参数一起来用，比如：

```js
function sum(base, ...nums) {
  let num = base;
  nums.forEach(function(item) {
    num += item * 1;
  });
  return num;
}

console.log(sum(30, 1, 2, 3)); // 36
console.log(sum(30, 1, 2, 3, 4)); // 40
```

::: warning 注意
arguments 不是数组，所以不能直接使用数组的原生 API 如 forEach，而 Rest Parameter 是数组，可以直接使用数组的原生 API。
:::

## 扩展运算符

Spread Operator 和 Rest Parameter 是形似但相反意义的操作符，简单的来说 Rest Parameter 是把不定的参数“收敛”到数组，而 Spread Operator 是把固定的数组内容“打散”到对应的参数。示例如下：

```js
function sum(x = 1, y = 2, z = 3) {
  return x + y + z;
}

console.log(sum(...[4])); // 9
console.log(sum(...[4, 5])); // 12
console.log(sum(...[4, 5, 6])); // 15
```

大家可以好好体会下前面两个示例，Rest Parameter 用来解决函数参数不确定的场景，Spread Operator 用来解决已知参数集合应用到固定参数的函数上，如果没有这个语法，可能需要这样做：

```js
function sum(x = 1, y = 2, z = 3) {
  return x + y + z;
}

console.log(sum.apply(null, [4])); // 9
console.log(sum.apply(null, [4, 5])); // 12
console.log(sum.apply(null, [4, 5, 6])); // 15
```

这种代码是否似曾相识？所以有了 Spread Operator 你的操作将更加简单！

## length 属性

函数指定了默认值以后，函数的 length 属性，将返回没有指定默认值的参数个数。

```js
function foo(x = 1, y = 2, z = 3) {
  console.log(x, y);
}
console.log(foo.length);
// 0
```

## name 属性

函数的 name 属性，返回该函数的函数名。

```js
function foo() {}

foo.name; // "foo"
```

## 箭头函数

箭头函数可以说是 ES6 很大的福利了，不管你是函数式爱好者还是面向对象开发者，函数是必须要用到的东西。之前声明函数需要使用 function，如下：

```js
function hello() {
  console.log("say hello");
}
// 或

let hello = function() {
  console.log("say hello");
};
```

现在可以这样做了：

```js
let hello = () => {
  console.log("say hello");
};
```

如果带参数该怎么做呢？

```js
let hello = (name) => {
  console.log("say hello", name);
};
// 或者

let hello = (name) => {
  console.log("say hello", name);
};
```

简写方式：

```js
let x = (x) => x;
//等同于
let x = function(x) {
  return x;
};
```

:::tip TIP
如果只有一个参数，可以省略括号，如果大于一个参数一定要记得带括号
:::

函数的声明和参数写的很清楚了，那么对于返回值有什么要注意的地方呢？

如果返回值是表达式

如果返回值是表达式可以省略 return 和 {}

```js
let pow = (x) => x * x;
```

如果返回值是字面量对象

如果返回值是字面量对象，一定要用小括号包起来

```js
let person = (name) => ({
  age: 20,
  addr: "Beijing City",
});
```

### 其他

其他情况就要中规中矩的写好啦！

## 拓展

看上去箭头函数真的很漂亮，可是它有什么神秘之处吗？this，对，就是它。普通函数和箭头函数对 this 的处理方式是截然不同的。
箭头函数中 this 指向定义时所在的对象，而不是调用时所在的对象。

```js
let foo = {
  name: "es",
  say: function() {
    console.log(this.name);
  },
};

console.log(foo.say()); // es
```

这是用普通函数的写法，say 在被调用之后，this 指向的是调用 say 方法的对象，显示是 foo 对象，所以 this === foo this.name 也就是 foo.name。

```js
let foo = {
  name: "es",
  say: () => {
    console.log(this.name, this);
  },
};
console.log(foo.say()); // undefined
```

因为箭头函数中对 this 的处理是定义时，this 的指向也就是 foo 外层的所指向的 window，而 window 没有 name 属性，所以结果是 undefined。

```js
let oBtn = document.querySelector("#btn");
oBtn.addEventListener("click", function() {
  console.log(this); //btn元素
});
```

```js
let oBtn = document.querySelector("#btn");
oBtn.addEventListener("click", function() {
  window.setTimeout(() => {
    //注意setTimeout的对象是window
    console.log(this); //window
  }, 1000);
});
```

如果使用 ES5 方式，使用 bind 改变 this 指向，这里之所以要使用 bind，因为 bind 方式是在调用的时候才去改变 this 指向，而 call 是在定义的时候就去改变 this 指向。

- apply 和 call 基本类似，他们的区别只是传入的参数不同。
- apply 传入的参数是包含多个参数的数组
- call 传入的参数是若干个参数列表
- bind 方法会创建一个新的函数，当被调用的时候，将其 this 关键字设置为提供的值，我们必须手动去调用

```js
let oBtn = document.querySelector("#btn");
oBtn.addEventListener("click", function() {
  //bind的this是指向了该this
  console.log(this);
  setTimeout(
    function() {
      // call apply bind
      console.log(this);
    }.bind(this),
    1000
  );
});
```

使用 es6，箭头函数实际上没有 this。

```js
let oBtn = document.querySelector("#btn");
oBtn.addEventListener("click", function() {
  setTimeout(() => {
    console.log(this); //指向于定义时的this
  }, 1000);
});
```

下面写法是错的，箭头函数不可以当作构造函数

```js
let People = (name, age) => {
  this.name = name;
  this.age = age;
};
let p1 = new People("xiecheng", 34);
console.log(p1);
```

箭头函数不可以使用 arguments 对象，可以使用 rest 参数

```js
let foo = (...args) => {
  // console.log(arguments)//这里会报错
  console.log(args);
};
foo(1, 2, 3);
```

:::tip 总结

1、箭头函数中 this 指向定义时所在的对象，而不是调用时所在的对象

2、箭头函数不可以当作构造函数

3、箭头函数不可以使用 arguments 对象

:::

## 练习

- 如何用箭头函数来实现一个数组排序的问题
- 箭头函数对 this 的处理还有什么妙用
