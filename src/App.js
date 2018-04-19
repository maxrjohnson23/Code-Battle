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

  componentDidMount() {
    this.PubNub = PUBNUB.init({
      publish_key: 'pub-c-fb92c27e-1e14-4842-8fda-17984b453dae',
      subscribe_key: 'sub-c-94b0177a-3ffa-11e8-8ce7-1294c71dad07',
      ssl: (location.protocol.toLowerCase() === 'https:'),
    });
    this.PubNub.subscribe({
      channel: 'ReactChat',
      message: (message) => this.setState({ 
        history: this.state.history.concat(message) 
      }),
    });
  }

  state = {
    userID: Math.round(Math.random() * 1000000).toString(),
    history: [],
  };
  
  sendMessage = (message) => {
    this.PubNub.publish({
      channel: 'ReactChat',
      message: message,
    });
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
