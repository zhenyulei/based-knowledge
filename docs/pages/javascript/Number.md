---
sidebarDepth: 1
---

## 二进制与八进制

请大家思考在 JS 中如何把十进制转化为二进制？

```js
const a = 5; // 101

console.log(a.toString(2));
```

如何把二进制转化为十进制？

```js
const b = 101;

console.log(parseInt(b, 2));
```

ES6 提供了二进制和八进制数值的新的写法，分别用前缀 0b（或 0B）和 0o（或 0O）表示。

```js
const a = 0b0101;
console.log(a);

const b = 0o777;
console.log(b);
```

## 新增方法

### Number.isFinite()

用来检查一个数值是否为有限的（finite），即不是 Infinity。

```js
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite("foo"); // false
Number.isFinite("15"); // false
Number.isFinite(true); // false
```

### Number.isNaN()

用来检查一个值是否为 NaN。将 ES5 中放在 window 上的 isNaN 放在了 Number 上。

```js
Number.isNaN(NaN); // true
Number.isNaN(15); // false
Number.isNaN("15"); // false
Number.isNaN(true); // false
Number.isNaN(9 / NaN); // true
Number.isNaN("true" / 0); // true
Number.isNaN("true" / "true"); // true
```

### Number.parseInt()

ES6 将全局方法 parseInt()移植到 Number 对象上面，行为完全保持不变。 这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

```js
// ES5的写法
parseInt("12.34"); // 12

// ES6的写法
Number.parseInt("12.34"); // 12
```

### Number.parseFloat()

ES6 将全局方法 parseFloat()移植到 Number 对象上面，行为完全保持不变。这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

```js
// ES5的写法
parseFloat("123.45#"); // 123.45

// ES6的写法
Number.parseFloat("123.45#"); // 123.45
```

### Number.isInteger()

用来判断一个数值是否为整数。

```js
Number.isInteger(25); // true
Number.isInteger(25.1); // false

Number.isInteger(); // false
Number.isInteger(null); // false
Number.isInteger("15"); // false
Number.isInteger(true); // false
```

### Number.MAX_SAFE_INTEGER

```js
Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1; // true

Number.MAX_SAFE_INTEGER === 9007199254740991; // true
```

### Number.MIN_SAFE_INTEGER

```js
Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER; // true

Number.MIN_SAFE_INTEGER === -9007199254740991; // true
```

### Number.isSafeInteger()

JavaScript 能够准确表示的整数范围在-2^53 到 2^53 之间（不含两个端点），超过这个范围，无法精确表示这个值。

```js
Math.pow(2, 53); // 9007199254740992

Math.pow(2, 53) === Math.pow(2, 53) + 1; // true
```

## Math 扩展

### Math.trunc()

方法用于去除一个数的小数部分，返回整数部分。

```js
console.log(Math.trunc(5.5));
console.log(Math.trunc(-5.5));
console.log(Math.trunc(true)); // 1
console.log(Math.trunc(false)); // 0
console.log(Math.trunc(NaN)); // NaN
console.log(Math.trunc(undefined)); // NaN
console.log(Math.trunc()); // NaN
```

### Math.sign()

方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。

它会返回五种值。

- 参数为正数，返回+1
- 参数为负数，返回-1
- 参数为 0，返回 0
- 参数为-0，返回-0
- 其他值，返回 NaN

```js
console.log(Math.sign(5)); // 1
console.log(Math.sign(-5)); // -1
console.log(Math.sign(0)); // 0
console.log(Math.sign(NaN)); // NaN
console.log(Math.sign(true)); // 1
console.log(Math.sign(false)); // 0
```

### Math.cbrt()

方法用于计算一个数的立方根。

```js
console.log(Math.cbrt(8)); // 2

console.log(Math.cbrt("imooc")); // NaN
```
