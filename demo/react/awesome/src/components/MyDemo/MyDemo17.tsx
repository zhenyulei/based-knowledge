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
