---
sidebarDepth: 1
---

> 代码放在 `demo/react/awesome/src/components/MyTsInReact` 文件夹中

### 1、给 state 设置 TS 类型

```js
interface ISourceMapList {
  fileUid: string;
  fileName: string;
  createTime: string;
}
const [srcList, setSrcList] = useState<ISourceMapList[]>([]);
```

### 2、给函数设置类型

```js
const handleCurrNumber = (
  parmas: number | string,
  isBlur: boolean = false
): void => {};
```

### 3、Record 类型

`type proxyKType = Record<K,T>`

会将 K 中的所有属性值都转换为 T 类型，并将返回的新类型返回给 proxyKType，K 可以是联合类型、对象、枚举…

示例：

```js
type petsGroup = "dog" | "cat" | "fish";
interface IPetInfo {
  name: string;
  age: number;
}

type IPets = Record<petsGroup, IPetInfo>;

const animalsInfo: IPets = {
  dog: {
    name: "dogName",
    age: 2,
  },
  cat: {
    name: "catName",
    age: 3,
  },
  fish: {
    name: "fishName",
    age: 5,
  },
};
```

### 属性名不确定的对象

```jsx
/* 属性名不确定的对象 */
export type Paths = {
  [key: string]: string,
};

// 等同于
// export type Paths = Record<string, string>;

const paths: Paths = {};

paths.home = "/home"; //OK
paths.settings = "/settings"; //OK
paths.somePath = "/somePath"; //OK
```

### React.FC 的使用

- 1、React.FC 是函数式组件，等同于 React.FunctionComponent：
- 2、props 自动获得传入的泛型已经 children 属性，函数自动获得 propTypes,contextTypes,defaultProps 和 displayName 四个属性，

> 虽然能够运行，但是是这样写 `const { message, children } = props;` 会提示警告

```js
import React from "react";
interface IPropsType {
  message: string;
}
const ChildBox: React.FC<IPropsType> = (props) => {
  const { message, children } = props;
  return (
    <>
      {children}
      <div>{message}</div>
    </>
  );
};

const MyTsDemo1 = () => {
  return (
    <>
      <ChildBox message="hello">我是父组件内容</ChildBox>
    </>
  );
};

export default MyTsDemo1;
```

```js
import React from "react";
interface IPropsType {
  message: string;
  children: React.ReactNode;
}
const ChildBox = (props: IPropsType) => {
  const { children, message } = props;
  return (
    <>
      {children}
      <div>{message}</div>
    </>
  );
};

const MyTsDemo1 = () => {
  return (
    <>
      <ChildBox message="hello">我是父组件内容</ChildBox>
    </>
  );
};

export default MyTsDemo1;
```

### React 组件 Props

```jsx
/* React 组件 Props */
interface Props {
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
}
//props的解构赋值
const Button = ({ onClick, disabled, children, style }: Props) => {
  return (
    <button onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
};

export default Button;
```

### 类型判断

```jsx
export function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

printId(101); // OK
printId("202"); // OK
```

### 部分对象 Partial

```js


/* 部分对象 Partial */

interface User {
  name: string;
  age: number;
  occupation: string;
}

export const users: User[] = [
  {
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep"
  },
  {
    name: "Wilson",
    age: 23,
    occupation: "Ball"
  }
];

type Criteria = {
  [Property in keyof User]?: User[Property];
};

// 等同于
// type Criteria = Partial<User>;
```

### 对象类型的修改:Omit

```js
/* 对象类型的修改 */
/* extends可以继承对象类型，但不可与原类型冲突，此时可以先使用 Omit 去除需要修改的属性 */

export interface TreeNode {
  id: number;
  value: number;
  children?: TreeNode[];
}

// 1. 去除 TreeNode 的 id 属性同时修改 children 属性的类型
export interface NodeWithoutId extends Omit<TreeNode, "id" | "children"> {
  children?: NodeWithoutId[];
}

// OK
const nodeWithoutId: NodeWithoutId = {
  value: 1,
  children: [
    {
      value: 2,
    },
  ],
};
```

### 参考链接

- [TypeScript 备忘录：如何在 React 中完美运用？](https://juejin.cn/post/6910863689260204039#heading-7)
- [TypeScript 中使用 React Hook](https://blog.csdn.net/stone805/article/details/92787346)
