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

  constructor(props){
    super(props);
    this.pubnub = new PubNubReact({ publishKey: 'pub-c-fb92c27e-1e14-4842-8fda-17984b453dae', subscribeKey: 'sub-c-94b0177a-3ffa-11e8-8ce7-1294c71dad07' });
    this.pubnub.init(this);

  }

  componentWillMount() {

    this.pubnub.subscribe({ 
      channels: ['channel1'], 
      withPresence: true, 
      message: (message) => this.setState({ 
      history: this.state.history.concat(message)}) 
    });

    //this.pubnub.getStatus();
    //this.pubnub.getMessage('channel1');
    this.pubnub.getPresence('channel1');
    this.pubnub.getMessage('channel1');

    /*this.pubnub.subscribe({
      channel: 'channel1',
      withPrescence: true,
      message: (message) => this.setState({ 
        history: this.state.history.concat(message) 
      }),
    });*/
     
    this.pubnub.getMessage('channel1', (message) => {
      console.log("hello");
      console.log(message);
    });
  }

  state = {
    userID: Math.round(Math.random() * 1000000).toString(),
    history: [],
  };
  
  sendMessage = (message) => {
    this.pubnub.publish({
      channel: 'channel1',
      message: message,
      });
      console.log(message);
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
