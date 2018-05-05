import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import PubNubReact from "pubnub-react";
import axios from "axios";
import "./App.css";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Navbar from "./components/Navbar/Navbar";
import Game from "./containers/Game/Game";
import MainImg from "./components/MainImg/MainImg";
import LobbyContainer from "./containers/LobbyContainer/LobbyContainer";
import CreateQuestion from "./components/CreateQuestion/CreateQuestion";
import UserPopup from "./components/UserPopup/UserPopup";
import { Input, TextArea, FormBtn } from "./components/Form";


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
      userscore: 0,
      gamesplayed: 0,
      showLogin: false,
      showUserModal: false,
      pubnubJoined: false,
      pubnub: this.pubnub
    };
    this.pubnub.init(this);
  }

  getUser = () => {
    axios.get("/user/").then(response => {
      if (response.data.user) {
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          userscore: response.data.user.score,
          gamesplayed: response.data.user.gamesplayed,
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
      this.pubnub.unsubscribe({
        channels: ["Channel-main"]
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
    console.log(`Initializing PubNub with user ${username}`);
    this.pubnub.setUUID(username);

    this.setState({
      pubnubJoined: true
    });
  };

  showUserHandler = () => {
        this.setState({
          showUserModal: true
        });
      };
      hideUserHandler = () => {
        this.setState({
          showUserModal: false
        });
      };

  // componentWillUnmount() {
  //   this.pubnub.unsubscribe({
  //     channels: [this.state.defaultChannel]
  //   });
  // };

  componentDidMount() {
    if (!this.state.loggedIn) {
      this.getUser();
    }
  }

  render() {

    return (
        <div className="App">
          <Navbar loginHandler={this.loginUserHandler}
                  showLoginHandler={this.showLoginHandler}
                  loggedIn={this.state.loggedIn}
                  username={this.state.username}
                  showUserModal={this.showUserHandler}
                  userscore={this.state.userscore}/>
          <LoginPopup
              loginHandler={this.loginUserHandler}
              showLogin={this.state.showLogin}
              hideLoginHandler={this.hideLoginHandler}/>
          <UserPopup
              showUserModal={this.state.showUserModal}
              hideUserModal={this.hideUserHandler}
              username={this.state.username}
              userScore={this.state.userscore}
              userGames={this.state.gamesplayed}/>
          <Route path="/" exact
                 render={() => {
                   return this.state.loggedIn ? <Redirect to="/lobby"/> :
                       <MainImg/>
                 }}/>
          <Route path="/lobby"
                 render={(props) => <LobbyContainer
                     {...props}
                     username={this.state.username}
                     pubnub={this.state.pubnub}/>}/>
          <Route path="/game"
                 render={(props) => <Game
                     {...props}
                     username={this.state.username}
                     pubnub={this.state.pubnub}/>}/>
          <Route path="/create-question"
                 render={(props) => <CreateQuestion
                     {...props}
                     username={this.state.username}
                     pubnub={this.state.pubnub}/>}/>
        </div>
    );
  }
}


export default App;