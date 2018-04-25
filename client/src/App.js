import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import axios from "axios";
import "./App.css";
import CodeSpace from "./containers/CodeSpace/CodeSpace";
import SignUp from "./components/SignUp/SignUp";
import LoginForm from "./components/LoginForm/LoginForm";
import Navbar from "./components/Navbar/Navbar";
import UserList from "./components/UserList/UserList";
import ChatHistory from "./components/ChatHistory/ChatHistory"
import LiveChat from "./components/LiveChat/LiveChat"
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
      messages: [],
      pubnubJoined: false,
      defaultChannel: "Channel-main",
      presentUsers: []
    };
    this.pubnub.init(this);
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels: [this.state.defaultChannel]
    });
  };

  sendMessage = (message) => {
    this.pubnub.publish({
      channel: this.state.defaultChannel,
      message: message,
    });
    console.log(message);
  };


  componentDidMount() {
    if (!this.state.loggedIn) {
      this.getUser();
    }
  }

  hereNow = () => {
    this.pubnub.hereNow(
        {
          channels: [this.state.defaultChannel],
          includeUUIDs: true,
          includeState: true
        },
        (status, response) => {
          console.log(status);
          console.log(response);
        }
    );
  };

  getUser = () => {
    axios.get("/user/").then(response => {
      console.log("Get User");
      if (response.data.user) {
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
        // Connect to PubNub with existing user session
        this.initPubnub(response.data.user.username);

      } else {
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    })
  };

  loginUserHandler = (userObj) => {
    this.setState(userObj);
    if (userObj.loggedIn) {
      // Connect to PubNub with newly logged in user
      this.initPubnub(userObj.username);
    } else {
      console.log('Unsubscribing');
      this.pubnub.unsubscribe({
        channels: [this.state.defaultChannel]
      });
      this.setState({
        pubnubJoined: false
      });
    }
  };

  initPubnub = (username) => {
    console.log(`Subscribing to PubNub with user ${username}`);
    this.pubnub.setUUID(username);
    this.pubnub.subscribe({
      channels: [this.state.defaultChannel],
      withPresence: true,
    });

    this.pubnub.getMessage(this.state.defaultChannel, (msg) => {
      console.log(msg);
    });

    this.pubnub.getPresence(this.state.defaultChannel, (event) => this.pubNubPresenceHandler(event));

    // Get current user list
    this.pubnub.hereNow(
        {
          channels: [this.state.defaultChannel],
          includeUUIDs: true
        },
        (status, response) => {
          if (status.statusCode === 200) {
            console.log("Channel users: ", response);
            let channelUsers = response.channels[this.state.defaultChannel].occupants.map(p => p.uuid);
            this.setState({
              presentUsers: channelUsers
            });
          }
        }
    );

    this.setState({
      pubnubJoined: true
    });
  };

  pubNubPresenceHandler = (event) => {
    console.log("Presence change: ", event);
    let updatedUserList = [...this.state.presentUsers];
    if (event.action === "join") {
      updatedUserList.push(event.uuid)
    } else if (event.action === "leave") {
      updatedUserList = updatedUserList.filter(u => u !== event.uuid);
    }
    this.setState({
      presentUsers: updatedUserList
    });
  };


  render() {
    const messages = this.pubnub.getMessage(this.state.defaultChannel);
    const {sendMessage, state} = this;


    return (
        <div className="App">
          <Navbar loginHandler={this.loginUserHandler}
                  loggedIn={this.state.loggedIn}
                  username={this.state.username}/>
          <button onClick={this.hereNow}>Here now</button>
          <Route exact path="/"
                 render={() => this.state.loggedIn ? <CodeSpace/> :
                     <Redirect to="/login"/>}/>
          <Route path="/login"
                 render={() => <LoginForm
                     loginHandler={this.loginUserHandler}/>}/>
          <Route path="/signup"
                 render={() => <SignUp/>}/>
          <ChatHistory history={messages}/>
          <LiveChat userID={state.userID} sendMessage={sendMessage}/>
          <UserList users={this.state.presentUsers}/>
        </div>
    );
  }
}

export default App;
