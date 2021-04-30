import React, { useEffect, useState } from "react";
function MyDemo6() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("触发了");
  });
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
      {console.log("render")}
      Count: {count}
      <br />
      <button onClick={handleClick}>点击常规改变count</button>
      <br />
      <button onClick={handleClickFn}>点击函数式改变count</button>
    </>
  );
}
export default MyDemo6;
