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
