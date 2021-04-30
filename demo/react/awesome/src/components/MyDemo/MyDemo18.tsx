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
