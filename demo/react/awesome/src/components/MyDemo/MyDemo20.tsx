import React, { useState, useEffect } from "react";
interface IChildDemoProps {
  id: number;
}
function ChildDemo(props: IChildDemoProps) {
  useEffect(() => {
    console.log(props.id);
    return () => {
      console.log("clear", props.id);
    };
  });
  return (
    <div className="container">
      <div className="el">{props.id}</div>
    </div>
  );
}

export default function MyDemo20() {
  const [myId, setMyId] = useState(0);
  return (
    <>
      <ChildDemo id={myId} />
      <button
        onClick={() => {
          setMyId(myId + 1);
        }}
      >
        点击me
      </button>
    </>
  );
}
