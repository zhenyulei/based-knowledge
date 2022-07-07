---
sidebarDepth: 1
---

## React.memo 与 useMemo 的区别和联系

如下面所示，父组件 state 发生变化，子组件也会发生变化，

```js
import { useMemo, useState, useRef } from "react";
const ReactMemoChild = () => {
  const ref = useRef(0);
  console.log("子组件重新渲染", ref.current);
  return (
    <>
      <p>子组件页面渲染次数：{ref.current++}</p>
    </>
  );
};
export const App = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>按钮点击次数：{count}</p>
      <ReactMemoChild />
      <button onClick={() => setCount((n) => n + 1)}>按钮</button>
    </>
  );
};

export default App;
```

> 注意，在上述例子中，如果使用了 React 严格模式. 则 console.log("子组件重新渲染", ref.current);执行多次，所以记得去除严格模式。

## 用 React.memo 把子组件进行包裹

```tsx
import React, { useMemo, useState, useRef } from "react";

const ReactMemoChild = React.memo(() => {
  const ref = useRef(0);
  console.log("子组件重新渲染", ref.current);
  return (
    <>
      <p>子组件页面渲染次数：{ref.current++}</p>
    </>
  );
});

export const App = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>按钮点击次数：{count}</p>
      <ReactMemoChild />
      <button onClick={() => setCount((n) => n + 1)}>按钮</button>
    </>
  );
};

export default App;
```

此时，无论父组件如何点击，子组件都不会进行重复渲染了。

## 可以通过 props 传递的参数值的变化来触发子组件的更新

```tsx
import React, { useMemo, useState, useRef } from "react";
interface ChildIprops {
  title: string;
  childArr: Array<any>;
}
const ReactMemoChild: React.FC<ChildIprops> = React.memo((props) => {
  const { title, childArr } = props;
  const ref = useRef(0);
  console.log("子组件重新渲染", ref.current);
  return (
    <>
      <p>子组件页面渲染次数：{ref.current++}</p>
      {childArr.map((item, index) => {
        return <h3 key={index}>{item.info.age}</h3>;
      })}
    </>
  );
});

export const App = () => {
  const initArr = [
    {
      name: "xiaoha",
      info: {
        age: 12,
      },
    },
  ];
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("初始标题");
  const [childArr, setChildArr] = useState(initArr);
  const changeArr = () => {
    const newArr = [...childArr]; //通过浅拷贝可以改变数组
    newArr[0].info.age = 20;
    setChildArr(newArr);
  };
  return (
    <>
      <p>按钮点击次数：{count}</p>
      <ReactMemoChild title={title} childArr={childArr} />
      <button onClick={() => setCount((n) => n + 1)}>按钮</button>
      <button onClick={() => setTitle("新标题")}>改变props按钮</button>
      <button onClick={changeArr}>改变数组按钮</button>
    </>
  );
};

export default App;
```

## 使用 useMemo

```tsx
import React, { useMemo, useState, useRef } from "react";

const ReactMemoChild = () => {
  const ref = useRef(0);
  return useMemo(() => {
    console.log("子组件重新渲染", ref.current);
    return (
      <>
        <p>子组件页面渲染次数{ref.current++}</p>
      </>
    );
  }, []);
};

export const App = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>按钮点击次数：{count}</p>
      <ReactMemoChild />
      <button onClick={() => setCount((n) => n + 1)}>按钮</button>
    </>
  );
};

export default App;
```

从下面例子可以看出，使用 useMemo 可以人为的控制，使用哪个依赖项来控制子组件的渲染，比如只想使用初始的 title，后续父组件的 title 发生变化，不再跟随变化，则在依赖项中可以不写 title

```tsx
import React, { useMemo, useState, useRef } from "react";
interface ChildIprops {
  title: string;
  childArr: Array<any>;
}
const ReactMemoChild: React.FC<ChildIprops> = (props) => {
  const { title, childArr } = props;
  const ref = useRef(0);
  return useMemo(() => {
    console.log("子组件重新渲染", ref.current);
    return (
      <>
        <h2>{title}</h2>
        <p>子组件页面渲染次数：{ref.current++}</p>
        {childArr.map((item, index) => {
          return <h3 key={index}>{item.info.age}</h3>;
        })}
      </>
    );
  }, [childArr]);
};

export const App = () => {
  const initArr = [
    {
      name: "xiaoha",
      info: {
        age: 12,
      },
    },
  ];
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("初始标题");
  const [childArr, setChildArr] = useState(initArr);
  const changeArr = () => {
    const newArr = [...childArr]; //通过浅拷贝可以改变数组
    newArr[0].info.age = 20;
    setChildArr(newArr);
  };
  return (
    <>
      <p>按钮点击次数：{count}</p>
      <ReactMemoChild title={title} childArr={childArr} />
      <button onClick={() => setCount((n) => n + 1)}>按钮</button>
      <button onClick={() => setTitle("新标题")}>改变props按钮</button>
      <button onClick={changeArr}>改变数组按钮</button>
    </>
  );
};

export default App;
```

### 使用 React.memo，如果子组件有函数调用父组件，则 React.memo 失效

```tsx
import React, { useState, useRef } from "react";
interface ChildIprops {
  clickBtn: () => void;
}
const ReactMemoChild: React.FC<ChildIprops> = React.memo((props) => {
  const ref = useRef(0);
  console.log("子组件重新渲染", ref.current);
  return (
    <>
      <p>子组件页面渲染次数：{ref.current++}</p>
      <button onClick={() => props.clickBtn()}>子组件按钮</button>
    </>
  );
});

export const App = () => {
  const [count, setCount] = useState(0);
  const clickBtn = () => {
    console.log("点击子组件按钮来");
  };
  return (
    <>
      <p>按钮点击次数：{count}</p>
      <ReactMemoChild clickBtn={clickBtn} />
      <button onClick={() => setCount((n) => n + 1)}>父组件按钮</button>
    </>
  );
};

export default App;
```

### 通过 useMemo,可以人为设置变更依赖项，所以子组件调用 props 的函数，父组件改变时不会重新渲染子组件

```tsx
import React, { useMemo, useState, useRef } from "react";
interface ChildIprops {
  clickBtn: () => void;
}
const ReactMemoChild: React.FC<ChildIprops> = (props) => {
  const ref = useRef(0);
  return useMemo(() => {
    console.log("子组件重新渲染", ref.current);
    return (
      <>
        <p>子组件页面渲染次数{ref.current++}</p>
        <button onClick={() => props.clickBtn()}>子组件按钮</button>
      </>
    );
  }, []);
};

export const App = () => {
  const [count, setCount] = useState(0);
  const clickBtn = () => {
    console.log("点击子组件按钮来");
  };
  return (
    <>
      <p>按钮点击次数：{count}</p>
      <ReactMemoChild clickBtn={clickBtn} />
      <button onClick={() => setCount((n) => n + 1)}>按钮</button>
    </>
  );
};

export default App;
```

综上所述，useMemo 和 React.memo 都可以缓存子组件。
不同在于：

- 1、使用方式 不同
  `React.memo` 用来包裹子组件·`React.memo(()=>{})`
  `useMemo(()=>{},[])`是放在子组件内部的，用来包裹 dom 元素
- 2、`React.memo`是 props 发生变化时才会渲染子组件，无需人为规定 props 依赖项，useMemo 需要人为设置依赖变化项；
- 3、`React.memo`在子组件调用父组件函数的话，父组件变化 state，就会影响子组件渲染，相当于 memo 失效，而 useMemo 不会失效，因为是人为设置的依赖项；
