import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import AceEditor from "react-ace";

import "brace/mode/javascript";
import "brace/theme/github";
import 'brace/theme/monokai';


class App extends Component {
  onChange = (newValue) => {
    console.log("change", newValue);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <AceEditor
          mode="javascript"
          theme="monokai"
          name="blah2"
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={18}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          width="1000px"
          value={`function onLoad(editor) {
  console.log("i've loaded");
}`}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}/>

      </div>
    );
  }
}

export default App;
