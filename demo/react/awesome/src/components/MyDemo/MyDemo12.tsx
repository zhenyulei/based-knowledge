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
