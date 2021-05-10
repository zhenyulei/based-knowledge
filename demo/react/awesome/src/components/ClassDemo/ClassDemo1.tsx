import React from "react";
import ClassChild1 from "./ClassChild1";
type IClassDemo1State = {
  date: number;
};
type IClassDemo1Props = {
  message?: string;
};
class ClassDemo1 extends React.Component<IClassDemo1Props, IClassDemo1State> {
  constructor(props: IClassDemo1Props) {
    console.log("constructor");
    super(props);
    this.state = {
      date: new Date().getTime(),
    };
  }
  componentDidMount() {
    window.onerror = function (message, file, lineNo, columnNo, error) {
      console.log(message + "发生在:" + lineNo + "--" + columnNo);
      return true;
    };
    aad();
    console.log("componentDidMount");
  }

  changeState() {
    this.setState({
      date: new Date().getTime(),
    });
  }
  render() {
    return (
      <>
        {console.log("render")}
        <div>{this.state.date}</div>
        <button
          onClick={() => {
            this.changeState();
          }}
        >
          点击改变状态
        </button>
        <ClassChild1 currDate={this.state.date}></ClassChild1>
      </>
    );
  }
}

export default ClassDemo1;
