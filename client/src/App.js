import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import CodeSpace from "./containers/CodeSpace/CodeSpace";

class App extends Component {
  state={
    test:""
  };


  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // test backend api
    fetch('/api').then(res => res.json()).
    then(res2 =>  {
      console.log(res2.test);
      this.setState({ test : res2.test })
    });
  }



  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title" id="console">Welcome to React {this.state.test}</h1>
          </header>
          <CodeSpace />
        </div>
    );
  }
}

export default App;
