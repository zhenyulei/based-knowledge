---
sidebarDepth: 1
---

## 属性简洁表示法

在 ES6 之前 Object 的属性必须是 key-value 形式，如下：

```js
let name = "xiecheng";
let age = 34;
let obj = {
  name: name,
  age: age,
  study: function() {
    console.log(this.name + "正在学习");
  },
};
```

在 ES6 之后是可以用简写的形式来表达：

```js
let name = "xiecheng";
let age = 34;
let obj = {
  name,
  age,
  study() {
    console.log(this.name + "正在学习");
  },
};
```

## 属性名表达式

在 ES6 可以直接用变量或者表达式来定义 Object 的 key。

```js
let s = "school";
let obj = {
  foo: "bar",
  [s]: "imooc",
};
```

## Object.is

判断两个对象是否相等。每次新建一个对象，相当于 new 一个 Object，两个内存地址

```js
let obj1 = {
  // new Object()
  name: "xiecheng",
  age: 34,
};

let obj2 = {
  // new Object()
  name: "xiecheng",
  age: 34,
};
console.log(obj1 == obj2); // false

console.log(Object.is(obj1, obj2)); // false

let obj2 = obj1;

console.log(Object.is(obj1, obj2)); // true
```

## Object.assign

Object.assign(x,y) 方法用于将所有可枚举属性的值从一个或多个源对象 y 复制到目标对象 x，它将返回目标对象，相同的属性，后面覆盖前面的。

```js
const target = {
  a: 1,
  b: 2,
};
const source = {
  b: 4,
  c: 5,
};

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```

使用 `in` 可以判断对象中是否包含该属性

```js
let x = {
  a: 3,
  b: 4,
};
console.log("a" in x);
```

### 基本语法

`Object.assign(target, ...sources)`
|参数 |含义 |必选|
|--|--|--|
|target |目标对象 |Y|
|sources| 源对象| N|

:::tip TIP
从语法上可以看出源对象的个数是不限制的（零个或多个），如果是零个直接返回目的对象，如果是多个相同属性的会被后边的源对象的属相覆盖。
:::

```js
let s = Object.assign({
  a: 1,
});
// {a: 1}
```

:::warning 注意
如果目的对象不是对象，则会自动转换为对象
:::

```js
let t = Object.assign(2);
// Number {2}
let s = Object.assign(2, {
  a: 2,
});
// Number {2, a: 2}
```

如果对象属性具有多层嵌套，这时使用 Object.assign()合并对象会怎么样呢？

```js
let target = {
  a: {
    b: {
      c: 1,
    },
    e: 4,
    f: 5,
    g: 6,
  },
};
let source = {
  a: {
    b: {
      c: 1,
    },
    e: 2,
    f: 3,
  },
};
Object.assign(target, source);
console.log(target);
```

我们惊奇的发现， g 属性消失了...

:::warning 注意

Object.assign()对于引用数据类型属于浅拷贝。
:::

:::tip TIP
对象的浅拷贝：浅拷贝是对象共用的一个内存地址，对象的变化相互印象。
对象的深拷贝：简单理解深拷贝是将对象放到新的内存中，两个对象的改变不会相互影响。
:::

## 思考

- 如果目标对象传入的是 undefined 和 null 将会怎样呢？
- 如果源对象的参数是 undefined 和 null 又会怎样呢？
- 如果目标对象是个嵌套的对象，子对象的属性会被覆盖吗？

## 对象的遍历方式

如何能够遍历出对象中每个 key 和 value 的值呢？

```js
let obj = {
    name: 'xiecheng',
    age: 34,
    school: 'imooc'
}
Array中演示过，for...in不能够用于遍历Array，for...in的作用是用于遍历对象的。

for (let key in obj) {
    console.log(key, obj[key])
}
Object.keys()用于返回对象所有key组成的数组。

Object.keys(obj).forEach(key => {
    console.log(key, obj[key])
})
Object.getOwnPropertyNames()用于返回对象所有key组成的数组。

Object.getOwnPropertyNames(obj).forEach(key => {
    console.log(key, obj[key])
})
Reflect.ownKeys()用于返回对象所有key组成的数组。

Reflect.ownKeys(obj).forEach(key => {
    console.log(key, obj[key])
})

```

## 对象的拷贝复制

target 中的 a.g 被覆盖了

```js
let target = {
  a: {
    b: {
      c: 1,
    },
    e: 4,
    f: 5,
    g: 6,
  },
};
let source = {
  a: {
    b: {
      c: 1,
    },
    e: 2,
    f: 3,
  },
};
Object.assign(target, source);
console.log(target);
```

```js
//基本类型是深复制，其实就是放在了单独的栈中
let a = 5;
let b = a;
a = 6;
console.log(a, b); //独立的
//引用类型放在了堆中，只是改变了栈内存中保存的地址，所以两个指向的同一个堆内存中
let obj1 = {
  name: "xiecheng",
  age: 34,
};
let obj2 = obj1;
obj1.age = 18;
console.log(obj1);
console.log(obj2); //也改变了
```

### 深拷贝

方式一：使用 JSON.string

```js
let obj1 = {
  name: "xiecheng",
  age: 34,
};
('{"a": "hello", "b": "world"}');

let obj = JSON.parse('{"a": "hello", "b": "world"}');
console.log(obj);
let str = JSON.stringify(obj);
console.log(str);
let str = JSON.stringify(obj1);
let obj2 = JSON.parse(str);
obj1.age = 18;
console.log(obj2);
```

方式二：使用递归方式

```js
// 检查类型
let checkType = (data) => {
  //[object Array],[object object]
  return Object.prototype.toString.call(data).slice(8, -1);
};
checkType({});

let deepClone = (target) => {
  let targetType = checkType(target);
  let result;
  if (targetType === "Object") {
    result = {};
  } else if (targetType === "Array") {
    result = [];
  } else {
    return target;
  }
  for (let i in target) {
    let value = target[i];
    let valueType = checkType(value);
    if (valueType === "Object" || valueType === "Array") {
      result[i] = deepClone(value); // 递归
    } else {
      result[i] = value;
    }
  }
  return result;
};
// let arr1 = [1, 2, {age: 18}]
// let arr2 = deepClone(arr1)
// arr2[2].age = 34
// console.log(arr1)

let obj1 = {
  name: "xiecheng",
  hobby: ["coding", "eating"],
};
let obj2 = deepClone(obj1);
obj2.hobby[0] = "sleeping";
console.log(obj1);
console.log(obj2);
```
