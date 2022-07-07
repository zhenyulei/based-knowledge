ES6 引入了一种新的原始数据类型 Symbol ，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

Symbol 值通过 Symbol 函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

## 声明方式

```js
let s = Symbol();
typeof s;
// "symbol"
```

变量 s 就是一个独一无二的值。typeof 的结果说明 s 是 Symbol 数据类型。

既然是独一无二的，那么两个 Symbol()就一定是不相等的：

```js
let s1 = Symbol();
let s2 = Symbol();
console.log(s1);
console.log(s2);
console.log(s1 === s2); // false
```

::: warning 注意
Symbol 函数前不能使用 new 命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。
:::
Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```js
let s1 = Symbol("foo");
let s2 = Symbol("foo");
console.log(s1);
console.log(s2);
console.log(s1 === s2); // false
```

## Symbol.for

Symbol.for() 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。

```js
let s1 = Symbol.for("foo");
let s2 = Symbol.for("foo");
console.log(s1 === s2); // true
```

::: warning 注意

Symbol.for()与 Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的 key 是否已经存在，如果不存在才会新建一个值。
:::

## Symbol.keyFor()

Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的 key。

```js
const s1 = Symbol("foo");
console.log(Symbol.keyFor(s1)); // undefined

const s2 = Symbol.for("foo");
console.log(Symbol.keyFor(s2)); // foo
```

## 作为属性名

由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

比如在一个班级中，可能会有同学名字相同的情况，这时候使用对象来描述学生信息的时候，如果直接使用学生姓名作为 key 会有有问题。

```js
const grade = {
  张三: {
    address: "xxx",
    tel: "111",
  },
  李四: {
    address: "yyy",
    tel: "222",
  },
  李四: {
    address: "zzz",
    tel: "333",
  },
};
console.log(grade);
// 只会保留最后一个李四
```

如果使用 Symbol，同名的学生信息就不会被覆盖：

```js
const stu1 = Symbol("李四");
const stu2 = Symbol("李四");
const grade = {
  [stu1]: {
    address: "yyy",
    tel: "222",
  },
  [stu2]: {
    address: "zzz",
    tel: "333",
  },
};
console.log(grade);
console.log(grade[stu1]); //获取
console.log(grade[stu2]);
```

## 属性遍历

```js
const sym = Symbol("imooc");
class User {
  constructor(name) {
    this.name = name;
    this[sym] = "imooc.com";
  }
  getName() {
    return this.name + this[sym];
  }
}
const user = new User("xiecheng");
console.log(user.getName());

//只有name属性
for (let key in user) {
  console.log(key);
}
//只有name属性
for (let key of Object.keys(user)) {
  console.log(key);
}

//只能取到Symbols属性
for (let key of Object.getOwnPropertySymbols(user)) {
  console.log(key);
}

//可以取到所有的属性
for (let key of Reflect.ownKeys(user)) {
  console.log(key);
}
```

## 消除魔术字符串

魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。

```js
function getArea(shape) {
  let area = 0;
  switch (shape) {
    case "Triangle":
      area = 1;
      break;
    case "Circle":
      area = 2;
      break;
  }
  return area;
}
console.log(getArea("Triangle"));
```

上面代码中，字符串 Triangle 和 Circle 就是魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。

使用 Symbol 就可以很好的解决这个问题：

```js
const shapeType = {
  triangle: Symbol(),
  circle: Symbol(),
};

function getArea(shape) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = 1;
      break;
    case shapeType.circle:
      area = 2;
      break;
  }
  return area;
}
console.log(getArea(shapeType.triangle));
```
