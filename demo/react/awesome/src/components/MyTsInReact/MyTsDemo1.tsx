import React from "react";
interface IPropsType {
  message: string;
}
const ChildBox: React.FC<IPropsType> = (props) => {
  const { message, children } = props;
  return (
    <>
      {children}
      <div>{message}</div>
    </>
  );
};

const MyTsDemo1 = () => {
  return (
    <>
      <ChildBox message="hello">我是父组件内容</ChildBox>
    </>
  );
};

export default MyTsDemo1;
