---
sidebarDepth: 1
---

## react-router

router 的最新官网地址： https://reactrouter.com/web/guides/quick-start
router 引子与：react-router-dom

### 基础示例

1、注意 `BrowserRouter as Router`
2、Router 包裹了`Link`、`Switch`、`Route`，其中`Switch`包裹了`Route`
3、使用 `Link` 进行跳转

```js
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
```

### 嵌套路由

使用 Link 跳转的路由一样，但是后面的参数匹配的是 嵌套路由，也就是点击 Link 后，topicId=components 或者 state

```js
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Link to={`/index/components`}>Components</Link>
        <br />
        <Link to={`/index/state`}>State</Link>
      </div>
      <Switch>
        <Route path={`/index/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </Router>
  );
}

function Topic() {
  let { topicId } = useParams(); //获取参数id
  const curr = useRouteMatch(); //获取当前路由的信息
  return (
    <h3>
      匹配当前参数 ID: {topicId} <br /> 匹配当前路由：{curr.url}
    </h3>
  );
}
```

### <BrowserRouter>和<HashRouter>

上面两个路由一般用在根部：

```js
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

####

```html
<BrowserRouter basename="/calendar">
  <link to="/today" />
  <!-- 渲染为href="/calendar/today"-->
</BrowserRouter>
```

### 路由匹配器

使用 Switch 包裹 Route，匹配到路由后会忽略其他路由，所以注意路由的顺序

比如下面方式`http://localhost:3000/about`,匹配到 Home，不会走到 About，所以`path="/"`放在最后面

```js
<Switch>
  <Route path="/">
    <Home />
  </Route>
  <Route path="/about">
    <About />
  </Route>
</Switch>
```

再如,如果`/contact`在上面则不会渲染`/contact/:id`

```js
<Switch>
  <Route path="/contact/:id">
    <Contact />
  </Route>
  <Route path="/contact">
    <AllContacts />
  </Route>
</Switch>
```

使用 exact 属性，可以严格匹配路由,这样`http://localhost:3000/about`，就会匹配到 `<About />`

```js
<Switch>
  <Route path="/" exact>
    <Home />
  </Route>
  <Route path="/about">
    <About />
  </Route>
</Switch>
```

### 路由懒加载

```json
{
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

```js
import loadable from "@loadable/component";
import Loading from "./Loading.js";

const LoadableComponent = loadable(() => import("./Dashboard.js"), {
  fallback: <Loading />,
});

export default class LoadableDashboard extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}
```

### NavLink

`NavLink`是作为导航标签，可以有一些特殊的样式属性，比如当元素处于活动状态时提供元素的类：

```js
<NavLink to="/faq" activeClassName="selected">
  FAQs
</NavLink>
```

```js
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: "bold",
    color: "red",
  }}
>
  FAQs
</NavLink>
```

### withRouter

1、把不是通过路由切换过来的组件中，将 react-router 的 history、location、match 三个对象传入 props 对象上,比如下面例子可以获取路由相关信息：
比如 app.js 这个组件，一般是首页，不是通过路由跳转过来的，而是直接从浏览器中输入地址打开的，如果不使用 withRouter 此组件的 this.props 为空，没法执行 props 中的 history、location、match 等方法。

```js
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  withRouter,
} from "react-router-dom";
import loadable from "@loadable/component";
import Loading from "./loading.js";

function App(props) {
  const { match, location, history } = props;
  console.log(match);
  console.log(location);
  console.log(history);
  return (
    <div>
      <div>
        <NavLink
          exact
          to="/"
          activeStyle={{
            fontWeight: "bold",
            color: "red",
          }}
        >
          Home
        </NavLink>
        <br />
        <NavLink
          to={`/about`}
          activeStyle={{
            fontWeight: "bold",
            color: "red",
          }}
        >
          About
        </NavLink>
      </div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </div>
  );
}

function About() {
  return <p>About</p>;
}
function Home() {
  return <p>Home</p>;
}

export default withRouter(App);
```

### useHistory

```js
import React from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";

function App(props) {
  return (
    <div>
      <div>
        <Link to="/about">About</Link>
        <br />
        <Link to="/">Home</Link>
      </div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </div>
  );
}

function About() {
  let history = useHistory();
  function handleClick() {
    history.push("/");
  }
  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
function Home() {
  return <p>Home</p>;
}

export default App;
```

### useLocation

当 url 发生变化的时候 useLocation 返回 location

```js
import React, { useEffect } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";

function App(props) {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <div>
      <div>
        <Link to="/about">About</Link>
        <br />
        <Link to="/">Home</Link>
      </div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </div>
  );
}

function About() {
  return <p>About</p>;
}
function Home() {
  return <p>Home</p>;
}

export default App;
```
