import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

class App extends Component {
  onChange = (newValue) => {
    console.log('change',newValue);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <AceEditor
          mode="java"
          theme="github"
          onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
        />
      </div>
    );
  }
}

export default App;
