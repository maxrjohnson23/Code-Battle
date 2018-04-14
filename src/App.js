import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import AceEditor from "react-ace";
import LiveChat from "./components/LiveChat";
import ChatHistory from "./components/ChatHistory"

import "brace/mode/javascript";
import "brace/theme/github";
import 'brace/theme/monokai';


class App extends Component {

  state = {
    userID: Math.round(Math.random() * 1000000).toString(),
    history: [],
  };
  
  sendMessage = (message) => {
    // for now this will let us know things work.  `console` will give us a
    // warning though
    console.log('sendMessage', message);
  }

  onChange = (newValue) => {
    console.log("change", newValue);
  };

  render() {
    const { sendMessage, state } = this;
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
          <ChatHistory history={ state.history } />
          <LiveChat userID={ state.userID } sendMessage={ sendMessage } />
      </div>
    );
  }
}

export default App;
