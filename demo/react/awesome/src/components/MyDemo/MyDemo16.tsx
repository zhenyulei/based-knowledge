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
