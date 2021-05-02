import React from "react";
interface IPropsType {
  message: string;
}
const ChildBox: React.FC<IPropsType> = (message, children) => {
  const changeBox = (event: React.MouseEvent<HTMLButtonElement>): void => {
    console.log(event.target);
  };
  return (
    <>
      {children.map((child, index) => {
        return <div key={index}>{child}</div>;
      })}
      <button onClick={(e) => changeBox(e)}>{message}</button>
    </>
  );
};

const MyTsDemo2 = () => {
  return (
    <>
      <ChildBox message="hello">我是父组件内容</ChildBox>
    </>
  );
};

export default MyTsDemo2;
