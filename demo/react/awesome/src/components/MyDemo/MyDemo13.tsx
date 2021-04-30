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
