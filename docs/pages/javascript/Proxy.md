---
sidebarDepth: 1
---

在 ES6 标准中新增的一个非常强大的功能是 Proxy，它可以自定义一些常用行为如查找、赋值、枚举、函数调用等。通过 Proxy 这个名称也可以看出来它包含了“代理”的含义，只要有“代理”的诉求都可以考虑使用 Proxy 来实现。

## 基本语法

语法

```js
let p = new Proxy(target, handler);
```

解释

| 参数    | 含义                                                                                | 必选 |
| ------- | ----------------------------------------------------------------------------------- | ---- |
| target  | 用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理） | Y    |
| handler | 一个对象，其属性是当执行一个操作时定义代理的行为的函数                              | Y    |

MDN 给出的解释偏官方，通俗的讲第一个参数 target 就是用来代理的“对象”，被代理之后它是不能直接被访问的，而 handler 就是实现代理的过程。

## 拦截操作场景

### 场景

我们经常读取一个对象的 key-value：

```js
let o = {
  name: "xiaoming",
  age: 20,
};

console.log(o.name); // xiaoming
console.log(o.age); // 20
console.log(o.from); // undefined
```

当我们读取 from 的时候返回的是 undefined，因为 o 这个对象中没有这个 key-value。想想看我们在读取数据的时候，这个数据经常是聚合的，当大家没有按照规范来的时候或者数据缺失的情况下，经常会出现这种“乌龙”现象。

如果我们不想在调用 key 的时候返回 undefined，之前的做法是这样的：

```js
console.log(o.from || "");
```

如果我们对所有代码都是这种写法，那阅读性和观赏性就不得而知了。值得庆幸的是，ES6 的 Proxy 可以让我们轻松的解决这一问题：

```js
let o = {
  name: "xiaoming",
  age: 20,
};

let handler = {
  get(obj, key) {
    return Reflect.has(obj, key) ? obj[key] : "";
  },
};

let p = new Proxy(o, handler);

console.log(p.from);
```

这个代码是想表达如果 o 对象有这个 key-value 则直接返回，如果没有一律返回 '' ，当然这里是自定义，大家可以根据自己的需要来写适合自己业务的规则。

刚才对数据的“读操作”进行了拦截，接下来我们描述下“写操作”进行拦截。

场景 1

从服务端获取的数据希望是只读，不允许在任何一个环节被修改。

```js
// response.data 是 JSON 格式的数据，来自服务端的响应
// 在 ES5 中只能通过遍历把所有的属性设置为只读
for (let [key] of Object.entries(response.data)) {
  Object.defineProperty(response.data, key, {
    writable: false,
  });
}
```

如果我们使用 Proxy 就简单很多了：

```js
let data = new Proxy(response.data, {
  set(obj, key, value) {
    return false;
  },
});
```

### 场景 2

对于数据交互而言，校验是不可或缺的一个环境，传统的做法是将校验写在了业务逻辑里，导致代码耦合度较高。如果大家使用 Proxy 就可以将代码设计的非常灵活。

```js
// Validator.js
export default (obj, key, value) => {
  if (Reflect.has(key) && value > 20) {
    obj[key] = value;
  }
};

import Validator from "./Validator";
let data = new Proxy(response.data, {
  set: Validator,
});
```

### 场景 3

如果对读写进行监控，可以这样写：

```js
let validator = {
  set(target, key, value) {
    if (key === "age") {
      if (typeof value !== "number" || Number.isNaN(value)) {
        throw new TypeError("Age must be a number");
      }
      if (value <= 0) {
        throw new TypeError("Age must be a positive number");
      }
    }
    return true;
  },
};
const person = {
  age: 27,
};
const proxy = new Proxy(person, validator);
proxy.age = "foo";
// <- TypeError: Age must be a number
proxy.age = NaN;
// <- TypeError: Age must be a number
proxy.age = 0;
// <- TypeError: Age must be a positive number
proxy.age = 28;
console.log(person.age);
// <- 28

// 添加监控
window.addEventListener(
  "error",
  (e) => {
    console.log(e.message); // Uncaught TypeError: Age must be a number
  },
  true
);
```

### 场景 4

什么实例一个对象，每个对象都有一个自己的 id 而且只读。

```js
class Component {
  constructor() {
    this.proxy = new Proxy({
      id: Math.random()
        .toString(36)
        .slice(-8),
    });
  }
  get id() {
    return this.proxy.id;
  }
}
```

## 常用拦截操作

### get

拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']。需求：传入下标，判断数组中该下标对应的是否有值。

```js
let arr = [7, 8, 9];
arr = new Proxy(arr, {
  get(target, prop) {
    //target表示传入的arr代理对象，prop表示arr[1]中的参数1
    // console.log(target, prop)
    return prop in target ? target[prop] : "error";
  },
});
console.log(arr[1]); //返回8
console.log(arr[10]); //返回error
// 类似字典功能，输入hello 输出你好，这样看来可以做出if/else相关的判断
let dict = {
  hello: "你好",
  world: "世界",
};
dict = new Proxy(dict, {
  get(target, prop) {
    return prop in target ? target[prop] : prop;
  },
});
console.log(dict["world"]); //世界
console.log(dict["imooc"]); //imooc
```

### set

拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值。需求：只能设置 number 类型

```js
let arr = [];
arr = new Proxy(arr, {
  set(target, prop, val) {
    if (typeof val === "number") {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  },
});
arr.push(5);
arr.push(6);
console.log(arr[0], arr[1], arr.length);
```

### has

拦截 propKey in proxy 的操作，返回一个布尔值。需求：判断输入的值是否在返回内

```js
let range = {
  start: 1,
  end: 5,
};

range = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end;
  },
});
console.log(2 in range);
console.log(9 in range);
```

### ownKeys

拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。

```js
let obj = {
  name: "imooc",
  [Symbol("es")]: "es6",
};
console.log(Object.getOwnPropertyNames(obj)); //只有name属性
console.log(Object.getOwnPropertySymbols(obj)); //只有 [Symbol("es")]属性
console.log(Object.keys(obj)); //只有name属性
for (let key in obj) {
  console.log(key);
}

//可以取到所有的属性
for (let key of Reflect.ownKeys(obj)) {
  console.log(key);
}
//想设置_password为私有属性
let userinfo = {
  username: "xiecheng",
  age: 34,
  _password: "***",
};
userinfo = new Proxy(userinfo, {
  ownKeys(target) {
    return Object.keys(target).filter((key) => !key.startsWith("_"));
  },
});

// for (let key in userinfo) {
//     console.log(key)
// }
console.log(Object.keys(userinfo));
```

### deleteProperty

拦截 delete proxy[propKey]的操作，返回一个布尔值。

```js
let user = {
  name: "xiecheng",
  age: 34,
  _password: "***",
};
user = new Proxy(user, {
  get(target, prop) {
    if (prop.startsWith("_")) {
      throw new Error("不可访问");
    } else {
      return target[prop];
    }
  },
  set(target, prop, val) {
    if (prop.startsWith("_")) {
      throw new Error("不可访问");
    } else {
      target[prop] = val;
      return true;
    }
  },
  deleteProperty(target, prop) {
    // 拦截删除
    if (prop.startsWith("_")) {
      throw new Error("不可删除");
    } else {
      delete target[prop];
      return true;
    }
  },
  ownKeys(target) {
    return Object.keys(target).filter((key) => !key.startsWith("_"));
  },
});
console.log(user.age);
console.log(user._password);
user.age = 18;
console.log(user.age);
try {
  user._password = "xxx";
} catch (e) {
  console.log(e.message);
}

try {
  // delete user.age
  delete user._password;
} catch (e) {
  console.log(e.message);
}
console.log(user.age);

for (let key in user) {
  console.log(key);
}
```

### apply

拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

```js
let sum = (...args) => {
  let num = 0;
  args.forEach((item) => {
    num += item;
  });
  return num;
};

sum = new Proxy(sum, {
  apply(target, ctx, args) {
    return target(...args) * 2;
  },
});
console.log(sum(1, 2));
console.log(sum.call(null, 1, 2, 3));
console.log(sum.apply(null, [1, 2, 3]));
```

### construct

拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)。

```js
let User = class {
  constructor(name) {
    this.name = name;
  }
};
User = new Proxy(User, {
  construct(target, args, newTarget) {
    console.log("construct");
    return new target(...args);
  },
});
console.log(new User("imooc"));
```
