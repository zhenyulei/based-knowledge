this 的指向一直都是 js 理解中比较困难的部分，这次把遇见的情况都展示出来；另外 ES6 新增的箭头函数不属于这个规律，特殊看待。

this 的指向 大致分为以下几种情况

1.普通函数 --- this 指向函数的调用对象

```js
function f() {
  var user = "XX";
  console.log(this.user); //undefined
  console.log(this); //window
}

f();
```

这里 f 的调用等同于 window.f(); 所以 f 函数内部 this 指向的是 window

2.对象方法中调用 ---- this 指向上级对象

```js
var obj = {
  user: "xxx",
  fn: function() {
    console.log(this.user); //xxx
  },
};
obj.fn();
```

【注 1】这里要注意一点，就是在对象中可能有多层嵌套的对象，但是 this 指向的都是他调用地方的上级对象

```js
var obj = {
  user: "xxx",
  b: {
    user: "bbb",
    fn: function() {
      console.log(this.user); // bbb
    },
  },
};
obj.b.fn();
```

如上，虽然是在 obj 里面 this 调用，但是因为是在 obj.b 这个对象中，所以 this 指向的是 obj.b

【注 2】注意不能只看上级对象，更关键的是调用对象

```js
var obj = {
  user: "xxx",
  b: {
    user: "bbb",
    fn: function() {
      console.log(this.user); // undefined
    },
  },
};
var f = obj.b.fn;
f();
```

如上，this 其实是在 f 执行的时候调用的，这时候，f 的 this 的调用对象是 window,那么就可以理解 window.user 为 undefined

【小结】在对象方法中的 this 的指向主要是看他最终调用的位置，它是由谁调用的，如果调用对象有多层，this 指向的是 this 的上级对象

3.构造函数 --- this 指向 new 出来的对象

```js
function Fn(){
this.user = "xxx;
}
var a = new Fn();
console.log(a.user); //xxx
```

new 的过程其实也是初始化了一个新的对象，然后用新的对象调用原先的函数 Fn.call(a) 这个情况跟下面这种情况类似了。

4.apply, call, bind 通过改变函数的调用对象而改变 this 的指向

```js
function foo() {
  console.log("id:", this.id); //42
}
var id = 21;
foo.call({ id: 42 }); //foo 函数的调用对象变成了 {id: 42},所以 this 指向发生了变化 5.箭头函数 this 的指向 ---- this 指向其定义时候的对象
```

5.箭头函数 this 的指向 ---- this 指向其定义时候的对象

```js
function foo() {
  setTimeout(() => {
    console.log("id:", this.id); //21
  }, 100);
}
var id = 21;
foo({ id: 42 });
```

图 1： 箭头函数，this 指向定义时候的对象，foo 在 window 作用域下，所以 this 指向 window; ===> 箭头函数的外层，foo 函数的 this 就是 window 对象

```js
function foo() {
  setTimeout(() => {
    console.log("id:", this.id); //42
  }, 100);
}
var id = 21;
foo.call({ id: 42 });
```

图 2：箭头函数，this 指向定义时对象，那么由于 foo.call 此时定义时候 this 指向了{ id: 42}对象，所以这里 id 输出的是 42；====> 箭头函数的外层，foo 函数的 this 就是{ id: 42} 对象

【小结】箭头函数的 this 在定义时所在的对象，其实质是因为箭头函数没有自己的 this,用的是外层的 this

【结尾】普通函数的 this 是看的是它执行时候的调用对象; 箭头函数的 this 与它的执行没有关系，在定义的时候就决定了；

[谈一下 js 中 this 的指向和箭头函数的特殊情况](https://segmentfault.com/a/1190000017091508)
[ES6 箭头函数里的 this](https://www.jianshu.com/p/c1ee12a328d2)
