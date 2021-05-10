import React from "react";

type IClassChild1Props = {
  currDate: number;
};
type IClassChild1State = {};
class ClassChild1 extends React.Component<
  IClassChild1Props,
  IClassChild1State
> {
  constructor(props: IClassChild1Props) {
    console.log("child-constructor");
    super(props);
  }
  componentDidMount() {
    console.log("child-componentDidMount");
  }
  render() {
    return (
      <>
        {console.log("child-render")}
        <h3>子组件中对应的props：{this.props.currDate}</h3>
      </>
    );
  }
}

export default ClassChild1;
