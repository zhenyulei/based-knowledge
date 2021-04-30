import React, { useState, useEffect } from "react";
export default function MyDemo10() {
  console.log("init render");
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("change");
      setCounter(counter + 2);
    }, 10000);
    console.log("effect:", timer);
  }, []);
  console.log("before render");
  return (
    <div className="container">
      {console.log("render...")}
      <div className="el">{counter}</div>
    </div>
  );
}
