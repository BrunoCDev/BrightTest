import React from "react";
import "./App.css";
import { getResult } from "./utils/task1";
import { returnSpecificValue } from "./utils/task2";
import { IResult } from "./types";

interface IAppState {
  data: IResult[];
}

class App extends React.Component<any, IAppState> {
  constructor(p: any) {
    super(p);
    this.state = {
      data: getResult()
    };
  }

  render() {
    console.log(returnSpecificValue(["PPC - Brand", "2016-10-10 (Mon)"], 141));
    return (
      <div>
        <p>test</p>
      </div>
    );
  }
}

export default App;
