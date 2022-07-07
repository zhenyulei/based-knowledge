---
sidebarDepth: 1
---

## 遍历器接口

ES6 为字符串添加了遍历器接口，详见 Iterator 一节，使得字符串可以被 for...of 循环遍历。

```js
for (let item of "imooc") {
  console.log(item);
}
```

## 模板字符串

在 ES6 之前对字符串的处理是相当的麻烦，看如下场景：

- 1. 字符串很长要换行

字符串很长包括几种情形一个是开发时输入的文本内容，一个是接口数据返回的文本内容。如果对换行符处理不当，就会带来异常。

- 2. 字符串中有变量或者表达式

如果字符串不是静态内容，往往是需要加载变量或者表达式，这个也是很常见的需求。之前的做法是字符串拼接：

```js
var a = 20;
var b = 10;
var c = "JavaScript";
var str = "My age is " + (a + b) + " and I love " + c;
console.log(str);
```

如果字符串有大量的变量和表达式，这个拼接简直是噩梦。

- 3. 字符串中有逻辑运算

我们通常写代码都是有逻辑运算的，对于字符串也是一样，它包含的内容不是静态的，通常是根据一定的规则在动态变化。

```js
var retailPrice = 20;
var wholesalePrice = 16;
var type = "retail";

var showTxt = "";

if (type === "retail") {
  showTxt += "您此次的购买单价是：" + retailPrice;
} else {
  showTxt += "您此次的批发价是：" + wholesalePrice;
}
```

看到这样的代码一定会感到很熟悉，通常大家的做法是使用上述的字符串拼接+逻辑判断，或者采用字符串模板类库来操作。

## String Literals

看了上述的应用场景，就要引入 String Literals 话题，这个是用来解决字符串拼接问题，从 ES6 开始可以这样定义字符串了。

```js
`string text``string text line 1
 string text line 2``string text ${expression} string text`;
```

在这里你可以任意插入变量或者表达式，只要用 \${} 包起来就好。

::: tip 注意

这里的符号是反引号，也就是数字键 1 左边的键，不是单引号或者双引号
:::

这样就可以轻松解决字符串包含变量或者表达式的问题了，对于多行的字符串，之前是这样处理

```js
console.log("string text line 1\n" + "string text line 2");
// "string text line 1
// string text line 2"
```

现在可以这样做了

```js
console.log(`string text line 1
string text line 2`);
// "string text line 1
// string text line 2"
```

完全不需要 \n 来参与。

## Tag Literals

前面的字符串字面量解决了字符串拼接的问题，对于包含复杂逻辑的字符串并不是简单的表达式能搞定的。所以需要另一种解决方案：Tag Literals，还是看上述那个例子:

```js
var retailPrice = 20;
var wholesalePrice = 16;
var type = "retail";

var showTxt = "";

if (type === "retail") {
  showTxt += "您此次的购买单价是：" + retailPrice;
} else {
  showTxt += "您此次的批发价是：" + wholesalePrice;
}
```

现在可以定义一个 Tag 函数，然后用这个 Tag 函数来充当一个模板引擎：

```js
function Price(strings, type) {
  let s1 = strings[0];
  const retailPrice = 20;
  const wholesalePrice = 16;
  let txt = "";
  if (type === "retail") {
    txt = `购买单价是：${retailPrice}`;
  } else {
    txt = `批发价是：${wholesalePrice}`;
  }
  return `${s1}${txt}`;
}

let showTxt = Price`您此次的${"retail"}`;

console.log(showTxt); //您此次的购买单价是：20
```

::: tip TIP

strings 参数指的是 Tag 函数后面被变量分割开的字符串集合，type 参数是对应第一个变量，Tag 函数可以有多个 type 类似的参数
:::

## 扩展方法

### String.prototype.fromCodePoint()

用于从 Unicode 码点返回对应字符，并且可以识别大于 0xFFFF 的字符。

```js
// ES5
console.log(String.fromCharCode(0x20bb7));

// ES6
console.log(String.fromCodePoint(0x20bb7));
```

### String.prototype.includes()

ES5 中可以使用 indexOf 方法来判断一个字符串是否包含在另一个字符串中，indexOf 返回出现的下标位置，如果不存在则返回-1。

```js
const str = "imooc";

console.log(str.indexOf("mo"));
```

ES6 提供了 includes 方法来判断一个字符串是否包含在另一个字符串中，返回 boolean 类型的值。

```js
const str = "imooc";

console.log(str.includes("mo"));
```

### String.prototype.startsWith()

判断参数字符串是否在原字符串的头部, 返回 boolean 类型的值。

```js
const str = "imooc";

console.log(str.startsWith("im"));
```

### String.prototype.endsWith()

判断参数字符串是否在原字符串的尾部, 返回 boolean 类型的值。

```js
const str = "imooc";

console.log(str.endsWith("mooc"));
```

### String.prototype.repeat()

repeat 方法返回一个新字符串，表示将原字符串重复 n 次。

```js
const str = "imooc";

const newStr = str.repeat(10);

console.log(newStr);
```
