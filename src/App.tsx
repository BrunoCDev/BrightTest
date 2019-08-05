import React from "react";
import "./App.css";
import { getResult } from "./utils/task1";
import { IResult } from "./types";
import { Table, Search } from "./components";

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
    return (
      <div>
        <Search />
        <Table Data={this.state.data} />
      </div>
    );
  }
}

export default App;
