---
sidebarDepth: 0
---

## 聊聊 React Hook 容易踩的坑

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。然而在我们日常开发使用过程中，总会遇到一些棘手的问题，一些看似明明很正确的写法，总是得不到想要实现的效果，最终这些问题萦绕在大脑中，挥之不去，耿耿于怀。于是索性沉下心来，汇总了 React Hook 开发中涉及到的一些问题，看看走过路过的你是否对以下问题都了如指掌了呢？

### 问题 1、如何监听 object 或者 array 类型中 useState 的改变？

**核心知识点** React 组件的更新机制对 state 只进行浅对比，也就是更新某个复杂类型数据时只要它的引用地址没变，那就不会重新渲染组件。更新复杂 state 的时候必须传给它一个全新的对象，而不是复制了它引用地址再修改的对象。所以 state 中如果是 object 或者 array 类型，如果直接改其值，是无法监听到变化。

**错误示例 1.1** 虽然点击两个按钮改变了 state 值，但是 useEffect 无法监听到 state 发生变化，html 也无法重新渲染

```jsx
import React, { useEffect, useState } from "react";
const MyDemo1 = () => {
  const [counter, setCounter] = useState({ a: 1, b: 2 });
  const [number, setNumber] = useState([1, 2, 3]);
  useEffect(() => {
    console.log("监听到变化");
  }, [counter, number]);
  const changeCounter = () => {
    counter.b = 40; //直接改变对象的值
    setCounter(counter);
  };
  const changeNumber = () => {
    number[2] = 10; //直接改变数组的值
    number.push(4);
    setNumber(number);
  };
  return (
    <>
      <div>{"counter:" + counter.a + "---" + counter.b}</div>
      <button onClick={changeCounter}>change counter</button>
      <div>num:</div>
      {number.map((item, index) => {
        return <p key={index}>{item}</p>;
      })}
      <button onClick={changeNumber}>change number</button>
    </>
  );
};
export default MyDemo1;
```

**结果示例**

![img](https://img14.360buyimg.com/imagetools/jfs/t1/181287/17/1569/869169/608b6da4E7959d9d9/2a06277450c88085.gif)

**正确示例 1.2**：使用展开运算符返回一个新对象或者新数组

```jsx
import React, { useState, useEffect } from "react";
const MyDemo2 = () => {
  const [counter, setCounter] = useState({ a: 1, b: 2 });
  const [number, setNumber] = useState([1, 2, 3]);
  useEffect(() => {
    console.log("监听到变化");
  }, [counter, number]);
  const changeCounter = () => {
    setCounter({ ...counter, b: 40 });
  };
  const changeNumber = () => {
    const newNumber = [...number];
    newNumber[2] = 20;
    newNumber.push(4);
    setNumber(newNumber);
  };
  return (
    <>
      <div>{"counter:" + counter.a + "---" + counter.b}</div>
      <button onClick={changeCounter}>change counter</button>
      <div>num:</div>
      {number.map((item, index) => {
        return <p key={index}>{item}</p>;
      })}
      <button onClick={changeNumber}>change number</button>
    </>
  );
};
export default MyDemo2;
```

**结果示例**

![img](https://img14.360buyimg.com/imagetools/jfs/t1/173183/21/7118/2228413/608b6e8dE07c0c241/afd295b7c3a749d7.gif)

## 问题 2、如何在异步改变 state 后拿到最新的 state 值？

**核心知识点** React 合成事件中改变状态是异步的，出于减少 render 次数，react 会收集所有状态变更，然后比对优化，最后做一次变更。

### 2.1 实时获取 state 值

比如点击按钮后改变 counter 的值，然后 counter 作为执行其他操作的参数，需要立刻更新：

**示例 2.1**

```js
import React, { useState } from "react";
const MyDemo3 = () => {
  const [counter, setCounter] = useState(0);
  function asyncData() {
    console.log("异步请求数据：", counter); //这里会使用num做一些处理，比如num作为参数请求数据
  }
  function changeCounter() {
    setCounter(10); //改变data后执行 asyncData 函数
    console.log("counter", counter); //num为0
    asyncData();
  }
  return (
    <>
      <div>{counter}</div>
      <button onClick={changeCounter}>改变num</button>
    </>
  );
};
export default MyDemo3;
```

![img](https://img12.360buyimg.com/imagetools/jfs/t1/184230/40/1529/527031/608b6fb4E87902239/f5b12b2d353c6fa2.gif)

如上图所示，在点击按钮之后，Html 中明明已经改变了 counter 的值，但是在 asyncData 函数中 counter 仍是 0。
结合上述核心知识点，在代码中可以看出，asyncData 的调用和 setstate 在同一个宏任务中，这时 react 还没有 render，所以直接使用 state 获取的是上一次闭包里的值 0。

这时会有小伙伴说，我们可以使用 useEffect 监听 counter，待 counter 变化后在执行 asyncData。

但是若多个按钮点击后导致 counter 发生变化，但是只有第一个按钮改变 counter 的时候才去执行 asyncData 函数，这种情况就不行了，比如：

**示例 2.2**

```jsx
import React, { useState, useEffect } from "react";
const MyDemo4 = () => {
  const [counter, setCounter] = useState(0);
  function asyncData() {
    console.log("异步请求数据：" + counter); //这里会使用num做一些处理，比如请求数据
  }
  function changeCounter() {
    setCounter(10);
    console.log("counter", counter); //num为0
  }
  function pureChangeCounter() {
    setCounter(20);
  }
  useEffect(() => {
    asyncData(), [counter];
  });
  return (
    <>
      <button
        onClick={() => {
          changeCounter();
        }}
      >
        点击我执行异步函数
      </button>
      <div>{counter}</div>
      <button
        onClick={() => {
          pureChangeCounter();
        }}
      >
        点击我只是单纯改变data
      </button>
    </>
  );
};
export default MyDemo4;
```

上述代码中，点击两个按钮都会改动 counter 的值，useEffect 监听 counter 变化后执行 asyncData 函数，但是如果只想让点击第一个按钮的时候才执行 asyncData 函数，上述使用 useEffect 监听就无法满足了。

**改进** 可以使用 useRef，useRef 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数。返回的 ref 对象在组件的整个生命周期内保持不变。

```js
import React, { useState, useRef } from "react";
const MyDemo5 = () => {
  const [counter, setCounter] = useState(0);
  const cunterRef = useRef(0);
  function asyncData() {
    console.log("异步请求数据：" + cunterRef.current); //这里会使用 num 做一些处理，比如请求数据
  }
  function changeCounter() {
    setCounter(10);
    cunterRef.current = 10;
    asyncData();
  }
  function pureChangeCounter() {
    cunterRef.current = 20;
    setCounter(20);
  }
  return (
    <>
      <button
        onClick={() => {
          changeCounter();
        }}
      >
        点击我执行异步函数
      </button>
      <div>{counter}</div>
      <button
        onClick={() => {
          pureChangeCounter();
        }}
      >
        点击我只是单纯改变 data
      </button>
    </>
  );
};
export default MyDemo5;
```

**结果示例**

![img](https://img12.360buyimg.com/imagetools/jfs/t1/173123/27/7202/1430331/608b7174E4418c7f1/7ad9fd89540582a6.gif)

如上图所示，点击两个按钮都可以改变 state 值，但是只有点击第一个按钮才会触发 asyncData 函数，并且第二个按钮改变的 state 值不会影响第一个按钮的逻辑。

### 2.2 usestate 函数式更新

如下面的代码 handleClickFn 中通过函数式改变 count，handleClick 是常规方法改变 count，多次点击按钮后，均是在 3s 之后改变 count，可以看出常规的方法只变化了一次，而函数式 usestate 则改变了多次，因为它可以获取之前的 state 值，也就是代码中的 prevCount 每次都是最新的值。

**示例 2.3**

```js
import React, { useState } from "react";
function MyDemo6() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setTimeout(() => {
      setCount(count + 1);
    }, 3000);
  }
  function handleClickFn() {
    setTimeout(() => {
      setCount((prevCount) => {
        return prevCount + 1;
      });
    }, 3000);
  }
  return (
    <>
      Count: {count}
      <button onClick={handleClick}>点击常规改变count</button>
      <br />
      <button onClick={handleClickFn}>点击函数式改变count</button>
    </>
  );
}
export default MyDemo6;
```

**结果示例**

![img](https://img11.360buyimg.com/imagetools/jfs/t1/172985/6/7130/2364131/608b7536E22bdbc2c/60b3e08984662193.gif)

如上图所示，多次点击第一个按钮，页面在 3s 之后只变化 1 次，而多次点击第二个按钮，页面在 3s 之后就会变化多次。因为 setTimeout 是宏任务，多次点击按钮，在 3s 之后同时执行了多次改变数据，根据上述核心知识点“React 合成事件中改变状态是异步的，出于减少 render 次数，react 会收集所有状态变更，然后比对优化，最后做一次变更。”所知，页面只会改变 1 次数据，如果想改变多次，就要使用函数式改变数据的方式。

以上类似地在短时间内多次触发 setCount 函数，如下面代码所示：

```js
import React, { useState } from "react";

function MyDemo7() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }
  function handleClickFn() {
    setCount((prevCount) => {
      return prevCount + 1;
    });
    setCount((prevCount) => {
      return prevCount + 1;
    });
    setCount((prevCount) => {
      return prevCount + 1;
    });
  }
  return (
    <>
      Count: {count}
      <br />
      <button onClick={handleClick}>点击常规改变count</button>
      <br />
      <button onClick={handleClickFn}>点击函数式改变count</button>
    </>
  );
}
export default MyDemo7;
```

**结果示例**

![img](https://img14.360buyimg.com/imagetools/jfs/t1/177383/27/1618/1663621/608b7754E21a3037d/37fde4e12e25932c.gif)

从上图可以看出，点击第一个按钮，页面数值只会变化 1 次，而点击第二个按钮就会变化 3 次。

## 问题 3、首次执行时 useEffect 的时机

**核心知识点** 函数首次执行时 useEffect 的副作用的依赖参数为 false 还会执行吗？useEffect 第二个参数表示发生变化后执行第一个函数，即使设置初始值为 false，DOM 初次渲染完以后也会执行 useEffect。

如下代码，即使 flag 为 false，首次执行函数也会执行 useEffect

**示例 3.1**

```js
import React, { useState, useEffect } from "react";
const MyDemo8 = () => {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    console.log("执行了effect", flag); //即使一开始是false，渲染完dom后也会执行该副作用
  }, [flag]);
  const changeFlag = () => {
    setFlag(true);
  };
  return (
    <div className="container">
      {console.log("渲染了组件")}
      <div>页面flag{flag}</div>
      <button onClick={changeFlag}>点击我切换flag</button>
    </div>
  );
};
export default MyDemo8;
```

**结果示例**

![img](https://img10.360buyimg.com/imagetools/jfs/t1/187690/36/666/825982/608b790dEdf730688/8bfcdcef33c7557c.gif)

如上图所示，即使刚开始我们设置了 flag 为 false，useEffect 也会在 render 之后执行一次，所以如果我们并不想让其一开始就执行的话，需要在 useEffect 中增加条件判断：

```js
import React, { useState, useEffect } from "react";
const MyDemo9 = () => {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    flag && console.log("执行了effect", flag); //即使一开始是false，渲染完dom后也会执行该副作用
  }, [flag]);
  const changeFlag = () => {
    setFlag(true);
  };
  return (
    <div className="container">
      {console.log("渲染了组件")}
      <div>页面flag{flag}</div>
      <button onClick={changeFlag}>点击我切换flag</button>
    </div>
  );
};
export default MyDemo9;
```

## 问题 4、组件中 useEffect 的执行顺序？

先不要看答案，想一想下面的代码 console.log 的顺序是什么？

**示例 4.1**

```js
import React, { useState, useEffect } from "react";
export default function MyDemo10() {
  console.log("init render");
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("change");
      setCounter(counter + 2);
    }, 1000);
    console.log("effect:", timer);
  }, []);
  console.log("before render");
  return (
    <div className="container">
      {console.log("render...")}
      <div className="el">{counter}</div>
    </div>
  );
}
```

**结果示例**

![img](https://img13.360buyimg.com/imagetools/jfs/t1/173013/15/7160/1118098/608b7c33Ed2cc895b/0637194c8786325e.gif)

- 首先按照顺序执行 `init render`---`before render`---`render...`
- 渲染完 DOM 之后，执行 useEffect 中 `effect`,500ms 之后，`change`，然后改变 counter
- 因为改变了 counter，所以重新渲染函数，`init render`---`before render`---`render...`

**示例 4.2** useEffect 中加入 return 之后呢？

```js
import React, { useState, useEffect } from "react";

export default function MyDemo11() {
  console.log("init render");
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("change");
      setCounter(counter + 2);
    }, 10000);
    console.log("effect:", timer);
    return () => {
      console.log("clear:", timer);
      clearTimeout(timer);
    };
  }, [counter]);
  console.log("before render");
  return (
    <div className="container">
      {console.log("render...")}
      <div className="el">{counter}</div>
    </div>
  );
}
```

**结果示例**

![img](https://img13.360buyimg.com/imagetools/jfs/t1/186510/31/706/1272641/608b7cf6E95091f31/7de1256737e0d902.gif)

- 首先按照顺序执行 `init render`---`before render`---`render...`
- 渲染完 DOM 之后，执行 useEffect 中 `effect`,500ms 之后，`change`，然后改变 counter
- 因为改变了 counter，所以重新渲染函数，`init render`---`before render`---`render...`
- 渲染完 DOM 之后，执行 useEffect 中 return,`clear`---执行完 return 后在次执行`effect`,500ms 之后，`change`，然后改变 counter
- 循环往复

**示例 4.3** 父子组件中的 useEffect, useLayoutEffect 执行顺序

```jsx
import React, { useState, useEffect, useLayoutEffect } from "react";

const Cards = () => {
  useEffect(() => {
    console.log("子孙组件useEffect");
  });
  useLayoutEffect(() => {
    console.log("子孙组件useLayoutEffect");
  });
  return <>{console.log("子孙组件render")}我是子孙组件</>;
};
const Child = (props) => {
  useEffect(() => {
    console.log("组件useEffect");
  });
  useLayoutEffect(() => {
    console.log("组件useLayoutEffect");
  });

  console.log("组件");
  return (
    <div>
      {console.log("组件render")}我是子组件{props.name}
      <Cards />
    </div>
  );
};
const MyDemo12 = () => {
  const [myName, SetMyName] = useState("初始值");
  return (
    <div>
      <Child name={myName} />
      <button onClick={() => SetMyName("新名字")}>点击</button>
    </div>
  );
};
export default MyDemo12;
```

**结果示例**

![img](https://img14.360buyimg.com/imagetools/jfs/t1/194975/32/591/1992571/608b7db7E253e65e4/3ddf4c2f0c28d4f9.gif)

点击按钮，改变子组件的 props，可以看到 useLayoutEffect 总是比 useEffect 先执行，如下图所示，先执行完父子组件的 useLayoutEffect，才会执行父子组件的 useEffect：

![img](https://img14.360buyimg.com/imagetools/jfs/t1/172716/29/4305/41535/60780812E6b73b1d5/70c30eaa9afabc11.png)

## 问题 5、useCallback、useMemo 和 React.memo 的区别联系

> useMemo 和 useCallback 接收的参数都是一样,第一个参数为回调，第二个参数为要依赖的数据

**共同作用** 仅当依赖数据发生变化, 才会重新计算结果，也就是起到缓存的作用。

**两者区别**

- 1、useMemo 计算结果是 **return 回来的值**, 主要用于缓存计算结果的值，应用场景如：需要计算的状态，类似于 vue 中的 computed
- 2、useCallback 计算结果是 **函数**, 主要用于缓存函数，应用场景如: 需要缓存的函数，因为函数式组件每次任何一个 state 的变化，整个组件都会被重新刷新，一些函数是没有必要被重新刷新的，此时就应该缓存起来，提高性能和减少资源浪费。

形如：

```js
const onShow = useMemo(() => {
  return () => {
    setShow((isShow) => !isShow);
  };
}, []);
const onShow = useCallback(() => {
  setShow((isShow) => !isShow);
}, []);
```

**示例 5.1** 父组件中 input 输入内容的时候会重新执行 Parent 函数式组件，就会重新渲染 Button 子组件

```js
import React, { useState } from "react";
//子组件
const Button = () => {
  console.log("我被重新渲染了");
  return (
    <div>
      <button>点击按钮</button>
    </div>
  );
};
//父组件
const MyDemo13 = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button />
    </div>
  );
};
export default MyDemo13;
```

![img](https://img13.360buyimg.com/imagetools/jfs/t1/172398/24/7192/917815/608b995fEfb8ade67/d7e1992c0e30f1b5.gif)

如上图所示，在父组件的 input 输入框中输入文字，按钮子组件居然也重新渲染了。

**示例 5.2** 改进方式：使用 React.memo 函数包裹子组件

> React.memo 仅检查 props 变更。如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

**注意的是** 默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。

```js
function ChildComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  返回 true 则不在渲染子组件，
  否则返回 false 渲染子组件
  */
}
export default React.memo(ChildComponent, areEqual);
```

示例改为：

```js
import React, { useState } from "react";
//子组件
const Button = React.memo(function Button() {
  console.log("我被重新渲染了");
  return (
    <div>
      <button>点击按钮</button>
    </div>
  );
});
//父组件
const MyDemo14 = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button />
    </div>
  );
};
export default MyDemo14;
```

![img](https://img12.360buyimg.com/imagetools/jfs/t1/194101/13/583/679308/608b9ca9E25449b54/21cd5146ec2689c1.gif)

由于 Button 组件被 React.memo 包裹，比较了 Button 的 props 没有发生变化，所以改变父组件的时候，不会重新渲染子组件。

我们再改进一下，如果要求点击子组件 Button 的按钮，触发父组件中 onShow 方法，从而改变 state：isShow，隐藏子组件：

**示例 5.3**

```js
import React, { useState } from "react";
const Button = React.memo(function Button(props) {
  console.log("子组件被重新渲染了");
  return (
    <div>
      <button onClick={props.onShow}>点击隐藏</button>
    </div>
  );
});

const MyDemo15 = () => {
  const [inputValue, setInputValue] = useState("");
  const [isShow, setIsShow] = useState(true);
  const onShow = () => {
    setIsShow((isShow) => !isShow);
  };
  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {isShow && <Button onShow={onShow} />}
    </div>
  );
};
export default MyDemo15;
```

![img](https://img12.360buyimg.com/imagetools/jfs/t1/185176/6/1613/798199/608b9d82E45fdc433/2c7c7c89ff696e64.gif)

我们发现父组件中 input 输入内容会导致父组件函数重新渲染，因为这关系到了 React 是如何浅层比较的，在子组件中 onShow 是引用类型，所以他们是始终都不相等的，也就是`[]===[]`这样比较时始终返回 false，在基本数据类型比较时 React.memo 才会起作用。从而导致子组件 Button 也会重新渲染。那么我们该如何优化呢？

**方法一：使用 React.memo 的第二个比较函数包裹子组件**

先确认执行顺序，像剥洋葱一样，我们看下面的示例：
**示例 5.4**

```js
import React, { useState, useEffect, useRef, useCallback } from "react";
function areEqual(prevProps, nextProps) {
  console.log(prevProps.arrList);
  console.log(nextProps.arrList);
  if (JSON.stringify(prevProps.arrList) === JSON.stringify(nextProps.arrList)) {
    console.log("true");
    return true;
  } else {
    console.log("false");
    return false;
  }
}
const Button = React.memo(function Button(props) {
  const prevCountRef = useRef();
  console.log("渲染子组件");
  useEffect(() => {
    console.log("子组件执行一次useEffect");
  }, []);
  useEffect(() => {
    if (props.arrList.length > 3) {
      console.log("子组件useEffect");
    }
  }, [props.arrList]);
  return (
    <div>
      <ul>
        {props.arrList.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}, areEqual);

const MyDemo16 = () => {
  const [inputValue, setInputValue] = useState("");
  const [arrList, setarrList] = useState([]);
  console.log("渲染父组件");
  useEffect(() => {
    console.log("父组件执行一次useEffect");
  }, []);
  useEffect(() => {
    if (inputValue.length > 0) {
      console.log("触发父组件useEffect");
      const newList = [...arrList];
      newList.push(inputValue);
      setarrList(newList);
    }
  }, [inputValue]);
  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button arrList={arrList} />
    </div>
  );
};
export default MyDemo16;
```

![img](https://img11.360buyimg.com/imagetools/jfs/t1/185259/28/1552/2349196/608b9ed7Ea85b94a6/b06ae4c8caf37bf0.gif)

- 渲染父组件-->渲染子组件-->子组件执行 useEffect-->父组件执行 useEffect
- 父组件中输入内容后，inputValue 发生变化，所以会触发：
- 父组件重新渲染-->执行 areEqual 函数[返回 true]（因为此时还没有触发父组件的 useEffect，所以没有改变 props）所以不渲染子组件-->父组件执行 useEffect，改变 arrList
- 重新渲染父组件-->执行 areEqual 函数[返回 false]（因为此时已经触发父组件的 useEffect，所以改变 props 的 arrList）-->渲染子组件

![img](https://img13.360buyimg.com/imagetools/jfs/t1/158237/36/16700/75937/6066d206E8be6c2a9/1f93df20c49f9e0b.png)

确定好执行顺序之后，我们再来看优化的示例：

**示例 5.5** 如果传入的 props 是函数时，即使父组件中传入的 props.onVisible 一样，但是子组件得到的也是不一样的

```js
import React, { useState } from "react";
function areEqual(prevProps, nextProps) {
  if (prevProps == nextProps) {
    console.log("true");
    return true;
  } else {
    console.log("false");
    return false;
  }
}
const Button = React.memo(function Button(props) {
  console.log("渲染子组件");
  return (
    <div>
      <button onClick={props.onShow}>点击按钮</button>
    </div>
  );
}, areEqual);

const MyDemo17 = () => {
  const [inputValue, setInputValue] = useState("");
  const onShow = () => {
    console.log("isShow");
    return "hello";
  };
  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button onShow={onShow} />
    </div>
  );
};
export default MyDemo17;
```

![img](https://img10.360buyimg.com/imagetools/jfs/t1/190828/31/658/2890087/608b9f7bE254be257/fde4e8ce2c6b6344.gif)

从上面可以看出，父组件输入内容后，父组件 state 发生变化，重新渲染父组件，则传递给子组件的函数也是重新渲染的，areEqual 函数打印的是 false。

当然我们可以修改 areEqual 函数，对比两次 props 传入的值是否一样，但是 props 数据较多的时候就有些不方便了。

```js
function areEqual(prevProps, nextProps) {
  if (JSON.stringify(prevProps) == JSON.stringify(nextProps)) {
    console.log("true");
    return true;
  } else {
    console.log("false");
    return false;
  }
}
```

这是 useCallback 或者 useMemo 就登场了：

**示例 5.6** 父组件使用 useCallback 或者 useMemo 控制父组件中函数的缓存

父组件：

```js
const onShow = useCallback(() => {
  console.log("isShow");
  return "hello";
}, []);
```

或者

```js
const onShow = useMemo(() => {
  return () => {
    console.log("isShow");
    return "hello";
  };
}, []);
```

**示例 5.7** 使用 useCallback 进行缓存函数示例

```js
import React, { useState, useMemo, useCallback } from "react";
const Button = React.memo(function Button(props) {
  console.log("子组件被重新渲染了");
  return (
    <div>
      <button onClick={props.onShow}>点击隐藏</button>
    </div>
  );
});

const MyDemo18 = () => {
  const [inputValue, setInputValue] = useState("");
  const [isShow, setIsShow] = useState(true);
  const onShow = useCallback(() => {
    setIsShow((isShow) => !isShow);
  }, [isShow]);
  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {isShow && <Button onShow={onShow} />}
    </div>
  );
};
export default MyDemo18;
```

![img](https://img10.360buyimg.com/imagetools/jfs/t1/191876/31/646/1998147/608ba083E856e7f15/71de8dab7815c891.gif)

从上图可以看出，父组件中 onShow 函数经过 useCallback 包裹后，子组件不再触发。

**示例 5.8** 类似的使用 useMemo 进行缓存

```js
const onShow = useMemo(() => {
  return () => {
    setIsShow((isShow) => !isShow);
  };
}, [isShow]);
```

> 注意 useMemo 用来返回缓存的变量；useCallBack 用来返回缓存的函数。

## 问题 6、如何获取上一时刻的 props 和 state？

**核心知识点** 使用 useRef 可以很好的保存变量，核心是在 render 之后执行 useEffect 保存当前的 state 和 props，然后下一次渲染子组件的时候，先执行自定义的 hook 函数，从而得到上一时刻的 state 和 props，待 render 之后再去执行 自定义的 hook 中的 useEffect 函数，从而更新保存的 useRef 中的变量，最终写成自定义 useHook 的形式：

**示例 6.1** 自定义的 Hook 函数，获取上一时刻的 props 和 state

```js
import React, { useState, useEffect, useRef } from "react";

//获取上一时刻的props
const usePreProps = (props) => {
  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = props;
  });
  return prevCountRef.current;
};

//获取上一时刻的state
const usePreData = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const ChildCom = (props) => {
  const [num, setNum] = useState(0);
  const mycounter = usePreProps(props.counter);
  console.log("上一时刻的props", mycounter);
  const preData = usePreData(num);
  console.log("上一时刻的data", preData);
  const changeNum = () => {
    setNum(num + 1);
  };
  return (
    <>
      <div>子组件props:{props.counter}</div>
      <div>子组件data:{num}</div>
      <button onClick={changeNum}>点击改变state</button>
    </>
  );
};
const MyDemo19 = () => {
  const [counter, SetCounter] = useState(0);
  const changeCounter = () => {
    SetCounter((preState) => {
      return preState + 1;
    });
  };
  return (
    <>
      <ChildCom counter={counter} />
      <button onClick={changeCounter}>点击改变子组件props</button>
    </>
  );
};
export default MyDemo19;
```

![img](https://img10.360buyimg.com/imagetools/jfs/t1/180079/27/1590/4869919/608ba26fE232a1022/114c75c505c33624.gif)

点击两个按钮，可以得到上一时刻的 props 值和 state 值，核心就是使用了 useRef，并使用自定义 Hook 进行了封装；

**示例 6.2** useEffect 中 return 返回的 props 是哪一次的？

```js
import React, { useState, useEffect } from "react";
interface IChildDemoProps {
  id: number;
}
function ChildDemo(props: IChildDemoProps) {
  useEffect(() => {
    console.log(props.id);
    return () => {
      console.log("clear", props.id);
    };
  });
  return (
    <div className="container">
      <div className="el">{props.id}</div>
    </div>
  );
}

export default function MyBox() {
  const [myId, setMyId] = useState(0);
  return (
    <>
      <ChildDemo id={myId} />
      <button
        onClick={() => {
          setMyId(myId + 1);
        }}
      >
        点击me
      </button>
    </>
  );
}
```

![img](https://img13.360buyimg.com/imagetools/jfs/t1/177803/24/1557/1108991/608ba390Eaa78f479/54486acd13a897b1.gif)

在 props 发生变化之后，每次执行 useEffect 前都会先执行 return 中的函数，所以 return 中的 props 都是上一次的 props

## 问题 7、如何使用“引用传递 Forwarding Refs”

引用传递（Ref forwading）是一种通过组件向子组件自动传递 引用 ref 的技术。比如某些 input 组件，需要控制其 focus，本来是可以使用 ref 来控制，但是因为该 input 已被包裹在组件中，这时就需要使用 Ref forward 来透过组件获得该 input 的引用。

```js
import React, { forwardRef, useEffect, useRef } from "react";

const FocusInput = forwardRef(function FocusInput(props, ref) {
  return <input type="text" ref={ref} defaultValue={props.inputDefault} />;
});

const MyDemo21 = () => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (!!inputRef.current) {
      inputRef.current.focus();
    }
  });
  return (
    <div>
      <p>forward ref</p>
      <FocusInput ref={inputRef} inputDefault={"默认值"} />
    </div>
  );
};
export default MyDemo21;
```

![img](https://img13.360buyimg.com/imagetools/jfs/t1/183636/29/1615/22229/608ba425Ec236a4a4/1ce2af433e54343b.jpg)

上述示例中，子组件使用了 forwardRef 进行包裹，则父组件可以通过 ref 透传对子组件的控制。也就是首次渲染子组件的时候，就会将光标放置在子组件的 input 输入框中。

## 总结

好了，洋洋洒洒通过了 20+个示例，介绍了 React Hook 在日常开发中要注意的一些问题和遇到过的坑，夯实了基础，相信遇见类似的问题不再一头雾水。然而整个 React Hook 知识体系庞大，后面我们仍需要总结学习，以上权当抛砖引玉，欢迎各位小伙伴留言讨论。
