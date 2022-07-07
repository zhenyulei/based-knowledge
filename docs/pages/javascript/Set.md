---
sidebarDepth: 1
---

在 JavaScript 里通常使用 Array 或 Object 来存储数据。但是在频繁操作数据的过程中查找或者统计并需要手动来实现，并不能简单的直接使用。 比如如何保证 Array 是去重的，如何统计 Object 的数据总数等，必须自己去手动实现类似的需求，不是很方便。 在 ES6 中为了解决上述痛点，新增了数据结构 Set 和 Map，它们分别对应传统数据结构的“集合”和“字典”。首先，我们先来学习下 Set 数据结构。

ES6 提供了新的数据结构 Set。**它类似于数组**，但是成员的值都是唯一的，没有重复的值。

## 基本语法

### 生成 Set 实例

`let s = new Set()`
可以定义一个空的 Set 实例，也可以在实例化的同时传入默认的数据。

`let s = new Set([1, 2, 3, 4])`

::: warning 注意
初始化的参数必须是可遍历的，可以是数组或者自定义遍历的数据结构。
:::

## 添加数据

```js
let s = new Set([1, 2, 3, 4]);
s.add("hello");
s.add("goodbye");
```

或者

```js
s.add("hello").add("goodbye");
```

:::tip 注意

Set 数据结构不允许数据重复，所以添加重复的数据是无效的
:::

## 删除数据

删除数据分两种，一种是删除指定的数据，一种是删除全部数据。

```js
// 删除指定数据
s.delete("hello"); // true
// 删除全部数据
s.clear();
```

## 统计数据

Set 可以快速进行统计数据，如数据是否存在、数据的总数。

```js
// 判断是否包含数据项，返回 true 或 false
s.has("hello"); // true
// 计算数据项总数
s.size; // 2
```

## 数据循环遍历

```js
s.forEach((item) => console.log(item));
for (let item of s) {
}
```

## 应用场景

### 数组去重

```js
let arr = [1, 2, 3, 4, 2, 3];
let s = new Set(arr);
console.log(s);
```

### 合并去重

```js
let arr1 = [1, 2, 3, 4];
let arr2 = [2, 3, 4, 5, 6];
let s = new Set([...arr1, ...arr2]);
console.log(s); //得到的是set
console.log([...s]); //得到的数组
console.log(Array.from(s)); //得到的数组
```

### 交集

```js
let s1 = new Set(arr1);
let s2 = new Set(arr2);
let result = new Set(arr1.filter((item) => s2.has(item)));
console.log(Array.from(result));
```

### 差集

```js
let arr3 = new Set(arr1.filter((item) => !s2.has(item)));
let arr4 = new Set(arr2.filter((item) => !s1.has(item)));
console.log(arr3);
console.log(arr4);
console.log([...arr3, ...arr4]);
```

### 遍历方式

```js
keys()：返回键名的遍历器
values()：返回键值的遍历器
entries()：返回键值对的遍历器
forEach()：使用回调函数遍历每个成员
for...of：可以直接遍历每个成员
  console.log(s.keys()) // SetIterator {"hello", "goodbye"}
  console.log(s.values()) // SetIterator {"hello", "goodbye"}
  console.log(s.entries()) // SetIterator {"hello" => "hello", "goodbye" => "goodbye"}
  s.forEach(item => {
      console.log(item) // hello // goodbye
  })

  for (let item of s) {
      console.log(item)
  }

  for (let item of s.keys()) {
      console.log(item)
  }

  for (let item of s.values()) {
      console.log(item)
  }

  for (let item of s.entries()) {
      console.log(item[0], item[1])
  }
```

:::tip TIP

不理解 SetIterator 没关系，后面会讲遍历器，耐心一点！
:::

## WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

WeakSet 的成员只能是对象，而不能是其他类型的值。

```js
const ws = new WeakSet();
ws.add(1);
// TypeError: Invalid value used in weak set
ws.add(Symbol());
// TypeError: invalid value used in weak set
let ws = new WeakSet();
const obj1 = {
  name: "imooc",
};
const obj2 = {
  age: 5,
};
ws.add(obj1);
ws.add(obj2);
ws.delete(obj1);
console.log(ws);
console.log(ws.has(obj2));
```

WeakSet 没有 size 属性，没有办法遍历它的成员。

WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
