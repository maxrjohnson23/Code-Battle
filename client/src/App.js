import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import CodeSpace from "./containers/CodeSpace/CodeSpace";

class App extends Component {

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title" id="console">Welcome to Code Battle</h1>
          </header>
          <CodeSpace />
        </div>
    );
  }
}

export default App;
