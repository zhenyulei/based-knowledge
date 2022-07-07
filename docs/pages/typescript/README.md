---
sidebarDepth: 2
---

在线运行 TS 链接：[链接](https://www.typescriptlang.org/zh/play?#code/Q)

### 1、Record 定义一个对象

定义一个对象的 key 和 value 类型，value 的类型一样；

```js
const nav = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};
```

#### 使用 Record，指定具体的 key 值

```ts
interface navProps {
  title: string;
}
type navKeys = "about" | "contact" | "home";
const nav: Record<navKeys, navProps> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};
```

### 方法二：使用 type，不再指定具体的 key 值

```ts
type navProps = {
  [key: string]: {
    title: string;
  };
};

const nav: navProps = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};
```

类似的可以定义接口中不确定的数据

```ts
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}
```

### 2、extends 继承指定属性

使用泛型限制类型属性

```ts
interface Iprops {
  length: number;
}
const getDataLength = <T extends Iprops>(data: T): number => {
  return data.length;
};
```

### 3、typeof

注意区分 type 和 typeof，typeof 用于判断基本类型

```ts
const getDataLength = (data: number | string): number => {
  if (typeof data === "string") {
    return data.length;
  } else {
    return 0;
  }
};
```

再者，可以通过 typeof 推断类型

```ts
const objName = {
  name: "xiao",
  age: 20,
};

type objIprops = typeof objName;
const getName = (data: objIprops): string => {
  return data.name;
};
getName({
  name: "haha",
  age: 12,
});
```

type，用来给一个类型起个新名字

```ts
type InfoProps = string | number;
const getDataLength = (data: InfoProps): number => {
  if (typeof data === "string") {
    return data.length;
  } else {
    return 0;
  }
};
```

type 和 interface 有相同也有不同点；
其中扩展方式：
interface 使用 extends 扩展；type 使用&扩展

```ts
interface A {
  a: string;
}
interface B extends A {
  b: number;
}
const obj: B = { a: `小杜`, b: 7 };

// type 扩展 type
type C = { a: string };
type D = C & { b: number };
const obj1: D = { a: `小杜杜`, b: 7 };
```

### 4、枚举类型

用来限制接口返回的一些 number ,将无意义指定为有意义，并且后续如果要改对应关系无需在代码中找到所有的 code 码进行修改。

```ts
enum resCode {
  SUCCESS = 2000,
  FAIL = 4000,
  NORESPONSE = 3000,
}
const setData = (code: number) => {
  switch (code) {
    case resCode.SUCCESS:
      console.log("响应成功");
      break;
    case resCode.SUCCESS:
      console.log("响应成功");
      break;
  }
};
```

### 5、字面量类型

限制变量的指定范围

```ts
let num: 1 | 2 | 3;
num = 3; //成功
num = 5; //失败
```

### 6、交叉类型

```ts
interface aa {
  name: string;
  info: string;
}

interface bb {
  name: string;
  info: number;
}

type cc = aa & bb;
const names: cc = {
  name: "lili",
  info: 123, //这里报错，因为同名基础属性info合并，由于之前设置的类型不一样，导致该属性变为nerver
};
```

### 6、keyof 关键字

```ts
const getInfo = <T, K extends keyof T>(data: T, key: K): T[K] => {
  return data[key];
};

const info = {
  name: "小杜杜",
  age: 7,
  sex: true,
};

getInfo(info, "name"); //ok
getInfo(info, "tel"); //error
```

### 7、in 映射类型, 用来映射遍历枚举类型

```ts
type aa = "name" | "age" | "info";

type Iprops = {
  [key in aa]: string;
};

const myName: Iprops = {
  name: "",
  age: "",
  info: "",
};
```

### Partial

`Partial<T> 作用：将所有属性变为可选的,Required<T> 作用：将所有属性变为必选的`

```ts
interface Props {
  name: string;
  age: number;
}

const info1: Partial<Props> = {
  name: "小杜杜",
};

interface Props {
  name: string;
  age: number;
  sex?: boolean;
}

const info1: Required<Props> = {
  name: "小杜杜",
  age: 7,
  sex: true,
};
```

### Pick

将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型

```ts
interface Props {
  name: string;
  age: number;
  sex: boolean;
}

type nameProps = Pick<Props, "name" | "age">;

const info: nameProps = {
  name: "小杜",
  age: 7,
};
```

### Omit

将已经声明的类型进行属性剔除获得新类型

```ts
interface Props {
  name: string;
  age: number;
  sex: boolean;
}

type nameProps = Omit<Props, "name">;

const info: nameProps = {
  age: 7,
  sex: true,
};
```

rops 原本属性包括 name、age、sex 三个属性，通过 Pick 我们吧 name 和 age 挑了出来，所以不需要 sex 属性.

### Exclude/Omit

`` 将 T 类型中的 U 类型剔除。

```ts
type info = "name" | "age" | "sex";
type info1 = "name" | "age";
type infoProps = Exclude<info, info1>; //  "sex"
```

### 参考文章

1、[一篇让你完全够用 TS 的指南](https://juejin.cn/post/7088304364078497800#heading-47)
