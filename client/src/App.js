import React, {Component} from "react";
import {Route} from "react-router-dom";
import axios from "axios";
import "./App.css";
import CodeSpace from "./containers/CodeSpace/CodeSpace";
import SignUp from "./components/SignUp/SignUp";
import LoginForm from "./components/LoginForm/LoginForm";
import Navbar from "./components/Navbar/Navbar";
import LiveChat from "./components/LiveChat";
import ChatHistory from "./components/ChatHistory";
import PubNubReact from "pubnub-react";


class App extends Component {

  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
      publishKey: "pub-c-f890eb61-09b5-49e5-bed1-274a32208c3b",
      subscribeKey: "sub-c-c6147708-458f-11e8-9967-869954283fb4"
    });
    this.state = {
      loggedIn: false,
      username: null,
      userID: Math.round(Math.random() * 1000000).toString(),
      messages: []
    };
    this.pubnub.init(this);
  }

  componentWillMount() {
    console.log(this.pubnub);
    this.pubnub.subscribe({
      channels: ["channel1"],
      withPresence: true
    });

    this.pubnub.getMessage("channel1", (msg) => {
      console.log(msg);
    });
  };

  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels: ["channel1"]
    });
  };

  sendMessage = (message) => {
    this.pubnub.publish({
      channel: "channel1",
      message: message,
    });
    console.log(message);
  };


  componentDidMount() {
    if (!this.state.loggedIn) {
      this.getUser();
    }
  }

  getUser = () => {
    axios.get("/user/").then(response => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      } else {
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  };

  updateUser = (userObj) => {
    this.setState(userObj);
  };


  render() {
    const messages = this.pubnub.getMessage("channel1");
    console.log(messages);
    const {sendMessage, state} = this;

    return (
        <div className="App">
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn}
                  username={this.state.username}/>
          <Route exact path="/" component={CodeSpace}/>
          <Route path="/login"
                 render={() => <LoginForm updateUser={this.updateUser}/>}/>
          <Route path="/signup"
                 render={() => <SignUp/>}/>
          <ChatHistory history={messages}/>
          <LiveChat userID={state.userID} sendMessage={sendMessage}/>
        </div>
    );
  }
}

export default App;
