import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import AceEditor from "react-ace";
import LiveChat from "./components/LiveChat";
import ChatHistory from "./components/ChatHistory";
import PubNubReact from 'pubnub-react';

import "brace/mode/javascript";
import "brace/theme/github";
import 'brace/theme/monokai';


class App extends Component {

  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
        publishKey: 'pub-c-f890eb61-09b5-49e5-bed1-274a32208c3b',
        subscribeKey: 'sub-c-c6147708-458f-11e8-9967-869954283fb4'
    });
    this.pubnub.init(this);
}

componentWillMount() {
  console.log(this.pubnub)
    this.pubnub.subscribe({
        channels: ['channel1'],
        withPresence: true       
    });

    this.pubnub.getMessage('channel1', (msg) => {
        console.log(msg);
    });
};

componentWillUnmount() {
    this.pubnub.unsubscribe({
        channels: ['channel1']
    });
};

sendMessage = (message) => {
  this.pubnub.publish({
    channel: 'channel1',
    message: message,
    });
    console.log(message);
};
  
  state = {
    userID: Math.round(Math.random() * 1000000).toString(),
    messages: [],
  };

  onChange = (newValue) => {
    console.log("change", newValue);
  };

  render() {
    const messages = this.pubnub.getMessage('channel1');
    console.log(messages)
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
          <ChatHistory history={ messages } />
          <LiveChat userID={ state.userID } sendMessage={ sendMessage } />
      </div>
    );
  }
}

export default App;
