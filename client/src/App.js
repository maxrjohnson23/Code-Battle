import React, {Component} from "react";
import {Route} from "react-router-dom";
import axios from "axios";
import "./App.css";
import CodeSpace from "./containers/CodeSpace/CodeSpace";
import SignUp from "./components/SignUp/SignUp";
import LoginForm from "./components/LoginForm/LoginForm";
import Navbar from "./components/Navbar/Navbar";


class App extends Component {
  state = {
    loggedIn: false,
    username: null
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
    return (
        <div className="App">
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn}
                  username={this.state.username}/>
          <Route exact path="/" component={CodeSpace}/>
          <Route path="/login"
                 render={() => <LoginForm updateUser={this.updateUser}/>}/>
          <Route path="/signup"
                 render={() => <SignUp/>}/>
        </div>
    );
  }
}

export default App;
