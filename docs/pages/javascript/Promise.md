---
sidebarDepth: 1
---

# 异步操作前置知识

## JS 是单线程的

就是同一个时间只能处理一个任务。就类似生活中的去超市排队结账，正常情况下，一位收银员只能为一位顾客结账，其他顾客需要在后面排队等候。

为什么 JS 是单线程的？作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM 。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定 JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

单线程就意味着，所有任务都需要排队，前一个任务结束，才能执行后一个任务。如果前一个任务耗时很长，那么后一个任务就不得不一直等待，于是乎，JS 设计者们把所有任分成两类，同步和异步。

- 同步：只有前一个任务执行完毕，才能执行后一个任务
- 异步：当同步任务执行到某个 WebAPI 时，就会触发异步操作，此时浏览器会单独开线程去处理这些异步任务。

```js
// 同步
const a = 2;
const b = 3;
console.log(a + b);

// 异步
setTimeout(() => {
  console.log(a + b);
}, 1000);
```

请思考下面的输出结果是什么？

```js
console.log(1);
setTimeout(() => {
  // 异步任务，放入任务队列中
  console.log(2);
}, 0);
console.log(3);

// 1、3、2
```

下图说明了同步任务和异步任务的执行过程：
![img](http://es.xiecheng.live/assets/img/task.9fef93a6.png)

## Ajax 原理

Ajax 即“Asynchronous Javascript And XML”（异步 JavaScript 和 XML），是指一种创建交互式、快速动态网页应用的网页开发技术，无需重新加载整个网页的情况下，能够更新部分网页的技术。通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。

```js
// 创建 XMLHttpRequest 对象
const url = "http://jsonplaceholder.typicode.com/users";
let xmlhttp;
if (window.XMLHttpRequest) {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp = new XMLHttpRequest();
} else {
  // code for IE6, IE5
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

// 发送请求
xmlhttp.open("GET", url, true);
xmlhttp.send();

// 服务端响应
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    //    console.log(xmlhttp.responseText)
    let obj = JSON.parse(xmlhttp.responseText);
    console.log(obj);
  }
};
```

## Callback Hell

JavaScipt 中的许多操作都是异步的，我们把上面的 Ajax 封装成一个函数：

```js
function ajax(url, callback) {
  let xmlhttp;
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // 发送请求
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  // 服务端响应
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //    console.log(xmlhttp.responseText)
      let obj = JSON.parse(xmlhttp.responseText);
      callback(obj);
    }
  };
}
```

我们在 static 文件夹下放入三个 json 文件：

a.json:

```js
{
    "a": "我是A"
}
```

b.json:

```js
{
    "b": "我是B"
}
```

c.json:

```js
{
    "c": "我是C"
}
```

我们可以像这样使用：

```js
// 加载并执行脚本
ajax("/static/a.json");
```

函数是异步调用的，因为操作不是立即完成的，而是之后才会完成。

```js
ajax("/static/a.json");
// 下面的代码不会等到ajax执行完才执行
// ...
```

这个过程大家并不陌生，可是如果在回调之后再回调呢？

```js
ajax("static/a.json", (res) => {
  console.log(res);
  ajax("static/b.json", (res) => {
    console.log(res);
    ajax("static/c.json", (res) => {
      console.log(res);
    });
  });
});
```

如果嵌套变多，代码层次就会变深，维护难度也随之增加。

这就被称为 “回调地狱” 或者“回调深渊”。

## 基本语法

Promise 就是为了解决“回调地狱”问题的，它可以将异步操作的处理变得很优雅。回调地狱，代码难以维护， 常常第一个的函数的输出是第二个函数的输入这种现象 promise 可以支持多个并发的请求，获取并发请求中的数据这个 promise 可以解决异步的问题，本身不能说 promise 是异步的。

创建 Promise 实例。

```js
const promise = new Promise(function(resolve, reject) {
    // ... some code

    if ( /* 异步操作成功 */ ) {
        resolve(value)
    } else {
        reject(error)
    }
})
```

Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

处理结果正常的话，调用 resolve(处理结果值)，将 Promise 对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
处理结果错误的话，调用 reject(Error 对象)，将 Promise 对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
Promise 实例生成以后，可以用 then 方法分别指定 resolved 状态和 rejected 状态的回调函数。

```js
promise.then(
  function(value) {
    // success
  },
  function(error) {
    // failure
  }
);
```

::: tip TIP

实际上 Promise 用起来还是比较简单的，是不是可以动手试一试去封装自己业务中应用到的异步操作了（之前用回调写的）？
:::

在这里必须说明下 Promise 内部是有状态的(pending、fulfilled、rejected)，Promise 对象根据状态来确定执行哪个方法。Promise 在实例化的时候状态是默认 pending 的，当异步操作是完成的，状态会被修改为 fulfilled，如果异步操作遇到异常，状态会被修改为 rejected，可以通过下图来看下状态的走向：

::: warning 注意

状态转化是单向的，不可逆转，已经确定的状态（fulfilled/rejected）无法转回初始状态（pending），而且只能是从 pending 到 fulfilled 或者 rejected
:::

![img](http://es.xiecheng.live/assets/img/promise.04ed9cc2.png)

**注意** 先执行 1 在执行 2

```js
const promise = new Promise(function(resolve, reject) {
  console.log(1);
});
console.log(2);
```

**注意** 先执行 1 在执行 2，最后执行 3，【3 是微任务】

```js
const promise = new Promise(function(resolve, reject) {
  console.log(1);
  resolve();
});
console.log(2);
promise.then((res) => {
  console.log(3);
});
```

## Promise.prototype.then()

基本语法

> promise.then(onFulfilled, onRejected)

示例

```js
var promise = new Promise(function(resolve, reject) {
  resolve("传递给then的值");
});
promise.then(
  function(value) {
    console.log(value);
  },
  function(error) {
    console.error(error);
  }
);
```

这段代码创建一个 Promise 对象，定义了处理 onFulfilled 和 onRejected 的函数（handler），然后返回这个 Promise 对象。

这个 Promise 对象会在变为 resolve 或者 reject 的时候分别调用相应注册的回调函数。

- 当 handler 返回一个正常值的时候，这个值会传递给 Promise 对象的 onFulfilled 方法。
- 定义的 handler 中产生异常的时候，这个值则会传递给 Promise 对象的 onRejected 方法。

## Promise.prototype.catch()

捕获异常是程序质量保障最基本的要求，可以使用 Promise 对象的 catch 方法来捕获异步操作过程中出现的任何异常。

基本语法

```js
p.catch(onRejected);

p.catch(function(reason) {
  // rejection
});
```

示例

```js
function test() {
  return new Promise((resolve, reject) => {
    reject(new Error("es"));
  });
}

test().catch((e) => {
  console.log(e.message); // es
});
```

这个代码展示了如何使用 catch 捕获 Promise 对象中的异常，有的同学会问 catch 捕获的是 Promise 内部的 Error 还是 Reject？上面的示例既用了 reject 也用了 Error，到底是哪个触发的这个捕获呢？

```js
function test() {
  return new Promise((resolve, reject) => {
    throw new Error("wrong");
  });
}

test().catch((e) => {
  console.log(e.message); // wrong
});
```

这个代码对比着上个代码就能明显感受出来的，throw Error 和 reject 都触发了 catch 的捕获，而第一个用法中虽然也有 Error 但是它不是 throw，只是 reject 的参数是 Error 对象，换句话说 new Error 不会触发 catch，而是 reject。

:::warning 注意

不建议在 Promise 内部使用 throw 来触发异常，而是使用 reject(new Error()) 的方式来做，因为 throw 的方式并没有改变 Pronise 的状态
:::

# Promise 静态方法

## Promise.resolve()

一般情况下我们都会使用 new Promise() 来创建 Promise 对象，但是除此之外我们也可以使用其他方法。

在这里，我们将会学习如何使用 Promise.resolve 和 Promise.reject 这两个方法。

静态方法 Promise.resolve(value) 可以认为是 new Promise() 方法的快捷方式。

比如 Promise.resolve(42) 可以认为是以下代码的语法糖。

```js
new Promise(function(resolve) {
  resolve(42);
});
```

在这段代码中的 resolve(42) 会让这个 Promise 对象立即进入确定（即 resolved）状态，并将 42 传递给后面 then 里所指定的 onFulfilled 函数。

方法 Promise.resolve(value) 的返回值也是一个 Promise 对象，所以我们可以像下面那样接着对其返回值进行 .then 调用。

```js
Promise.resolve(42).then(function(value) {
    console.log(value)
})
Promise.resolve 作为 new Promise() 的快捷方式，在进行 Promise 对象的初始化或者编写测试代码的时候都非常方便。
```

## Promise.reject()

Promise.reject(error) 是和 Promise.resolve(value) 类似的静态方法，是 new Promise() 方法的快捷方式。

比如 Promise.reject(new Error("出错了")) 就是下面代码的语法糖形式。

```js
new Promise(function(resolve, reject) {
  reject(new Error("出错了"));
});
```

这段代码的功能是调用该 Promise 对象通过 then 指定的 onRejected 函数，并将错误（Error）对象传递给这个 onRejected 函数。

```js
Promise.reject(new Error("BOOM!"));
```

### 使用场景

比如定义了 foo 函数，为 true 的时候返回 promise 对象，如果为 false 的时候返回字符串 fail，则调用 foo 的时候无法使用 then 函数，因为返回的是字符串不是 promise 函数。【中间省略了业务逻辑】

```js
function foo(flag) {
  if (flag) {
    return new Promise((resolve) => {
      // 异步操作
      resolve("success");
    });
  } else {
    return "fail";
  }
}

foo(false).then((res) => {
  console.log(res);
});
```

优化为,使用 Promise.resolve 包裹字符串

```js
function foo(flag) {
  if (flag) {
    return new Promise((resolve) => {
      // 异步操作
      resolve("success");
    });
  } else {
    return Promise.resolve("fail");
  }
}

foo(false).then((res) => {
  console.log(res);
});
```

如果使用 Promise.reject 包裹，则使用 then 中的第二个函数获取

```js
function foo(flag) {
  if (flag) {
    return new Promise((resolve) => {
      // 异步操作
      resolve("success");
    });
  } else {
    // return 'fail'
    return Promise.reject("fail");
  }
}

foo(false).then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
```

## Promise.all()

基本语法

> Promise.all(promiseArray)

示例

```js
var p1 = Promise.resolve(1);
var p2 = Promise.resolve(2);
var p3 = Promise.resolve(3);
Promise.all([p1, p2, p3]).then(function(results) {
  console.log(results); // [1, 2, 3]
});
```

Promise.all 生成并返回一个新的 Promise 对象，所以它可以使用 Promise 实例的所有方法。参数传递 promise 数组中所有的 Promise 对象都变为 resolve 的时候，该方法才会返回， 新创建的 Promise 则会使用这些 promise 的值。

如果参数中的任何一个 promise 为 reject 的话，则整个 Promise.all 调用会立即终止，并返回一个 reject 的新的 Promise 对象。

```js
var p1 = Promise.resolve(1);
var p2 = Promise.reject(2);
var p3 = Promise.resolve(3);
Promise.all([p1, p2, p3]).then(
  function(results) {
    console.log(results);
  },
  function(error) {
    console.log("error");
  }
);
```

由于参数数组中的每个元素都是由 Promise.resolve 包装（wrap）的，所以 Promise.all 可以处理不同类型的 Promise 对象。

## Promise.race()

基本语法

> Promise.race(promiseArray)

示例

```js
var p1 = Promise.resolve(1);
var p2 = Promise.resolve(2);
var p3 = Promise.resolve(3);
Promise.race([p1, p2, p3]).then(function(value) {
  console.log(value); // 1
});
```

Promise.race 生成并返回一个新的 Promise 对象。

参数 promise 数组中的任何一个 Promise 对象如果变为 resolve 或者 reject 的话， 该函数就会返回，并使用这个 Promise 对象的值进行 resolve 或者 reject。

### 练习

如何把前面 Callback Hell 的代码改写成 promise 的写法呢？

下面的写法中 catch 是在最后面的，前面一旦发生异常就直接跳转到 catch 中了，中间的 then 不再执行

```js
function getPromise(url) {
  return new Promise((resolve, reject) => {
    ajax(
      url,
      (res) => {
        resolve(res);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

getPromise("static/a.json")
  .then((res) => {
    console.log(res);
    return getPromise("static/b.json");
  })
  .then((res) => {
    console.log(res);
    return getPromise("static/c.json");
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

catch 函数在中间处理

```js
getPromise("static/aa.json")
  .then(
    (res) => {
      console.log(res);
      return getPromise("static/b.json");
    },
    (err) => {
      //没有获取到aa.json文件
      console.log(err);
      return getPromise("static/b.json");
    }
  )
  .then((res) => {
    //由于上面失败了 所以这里承接的是失败后的then，获取到的是b.json文件
    console.log(res);
    //这里return了c
    return getPromise("static/c.json");
  })
  .then((res) => {
    //这里获取到的是c文件
    console.log(res);
  });
```
