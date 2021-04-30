import React, { forwardRef, useEffect, useRef } from "react";

const FocusInput = forwardRef(function FocusInput(props, ref) {
  return <input type="text" ref={ref} defaultValue={props.inputDefault} />;
});

const MyDemo21 = () => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (!!inputRef.current) {
      inputRef.current.focus();
    }
  });
  return (
    <div>
      <p>forward ref</p>
      <FocusInput ref={inputRef} inputDefault={"默认值"} />
    </div>
  );
};
export default MyDemo21;
