import * as React from "react";
import * as ReactDOM from "react-dom";

import "./app.scss";

import {
  MyDemo1,
  MyDemo2,
  MyDemo3,
  MyDemo4,
  MyDemo5,
  MyDemo6,
  MyDemo7,
  MyDemo8,
  MyDemo9,
  MyDemo10,
  MyDemo11,
  MyDemo12,
  MyDemo13,
  MyDemo14,
  MyDemo15,
  MyDemo16,
  MyDemo17,
  MyDemo18,
  MyDemo19,
  MyDemo20,
  MyDemo21,
} from "../components/MyDemo";
import { MyTsDemo1 } from "../components/MyTsInReact";
ReactDOM.render(
  <div className="App">
    <MyTsDemo1 />
  </div>,
  document.getElementById("app") as HTMLElement
);
