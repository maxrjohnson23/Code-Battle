import React, {Component} from "react";
import {Route} from "react-router-dom";
import axios from "axios";
import "./App.css";
import CodeSpace from "./containers/CodeSpace/CodeSpace";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Navbar from "./components/Navbar/Navbar";
import UserList from "./components/UserList/UserList";
import LiveChat from "./components/LiveChat/LiveChat";
import PubNubReact from "pubnub-react";


class App extends Component {

  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
      publishKey: "pub-c-f890eb61-09b5-49e5-bed1-274a32208c3b",
      subscribeKey: "sub-c-c6147708-458f-11e8-9967-869954283fb4",
      presenceTimeout: 30
    });
    this.state = {
      loggedIn: false,
      username: null,
      showLogin: false,
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

  getUser = () => {
    axios.get("/user/").then(response => {
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
    });
  };

  loginUserHandler = (userObj) => {
    this.setState(userObj);
    if (userObj.loggedIn) {
      // Connect to PubNub with newly logged in user
      this.initPubnub(userObj.username);
      this.setState({
        showLogin: false
      });
    } else {
      console.log("Unsubscribing");
      this.pubnub.unsubscribe({
        channels: [this.state.defaultChannel]
      });
      this.setState({
        pubnubJoined: false,
        showLogin: false
      });
    }
  };

  hideLoginHandler = () => {
    console.log("Setting false login");
    this.setState({
      showLogin: false
    });
  };

  showLoginHandler = () => {
    console.log("Setting show login");
    this.setState({
      showLogin: true
    });
  };

  initPubnub = (username) => {
    console.log(`Subscribing to PubNub with user ${username}`);
    this.pubnub.setUUID(username);
    this.pubnub.subscribe({
      channels: [this.state.defaultChannel],
      withPresence: true,
    });

    this.pubnub.getMessage(this.state.defaultChannel, (msg) => {
      const updatedMessages = this.state.messages.concat(msg);
      this.setState({
        messages: updatedMessages
      });
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
      updatedUserList.push(event.uuid);
    } else if (event.action === "leave") {
      updatedUserList = updatedUserList.filter(u => u !== event.uuid);
    }
    this.setState({
      presentUsers: updatedUserList
    });
  };


  render() {

    return (
        <div className="App">
          <Navbar loginHandler={this.loginUserHandler}
                  showLoginHandler={this.showLoginHandler}
                  loggedIn={this.state.loggedIn}
                  username={this.state.username}/>
          <LoginPopup
              loginHandler={this.loginUserHandler}
              showLogin={this.state.showLogin}
              hideLoginHandler={this.hideLoginHandler}/>
                  
          <div className="hcontainer">
            <div className="code-space">
              <Route exact path="/"
                    render={() => <CodeSpace/>}/>
            </div>
            <div className="user-list">
              <UserList users={this.state.presentUsers}/>
            </div>
          </div>
            <div className="live-chat">
              <LiveChat userID={this.state.username}
                        sendMessage={this.sendMessage}
                        history={this.state.messages}/>
            </div>
        </div>
    );
  }
}


export default App;
