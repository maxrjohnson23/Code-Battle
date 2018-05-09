import React, {Component} from "react";
import Modal from "../UI/Modal/Modal";
import axios from "axios";
import LoginForm from "./LoginForm/LoginForm";

class LoginPopup extends Component {
  state = {
    username: "",
    password: "",
    message: ""
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event, action) => {
    event.preventDefault();
    console.log("handleSubmit");

    if (action === "login") {
      this.handleLogin();
    } else if (action === "signup") {
      this.handleSignup();
    } else if (action === "guest") {
      this.handleGuest();
    }
  };

  handleLogin = () => {
    axios
        .post("/user/login", {
          username: this.state.username,
          password: this.state.password
        })
        .then(response => {
          console.log("login response: ");
          console.log(response);
          if (response.status === 200) {
            // update App.js login state
            this.props.loginHandler({
              loggedIn: true,
              username: response.data.username,
              userscore: response.data.score,
              gamesplayed: response.data.gamesplayed
            });
          }
          this.setState({
            username: "",
            password: "",
            message: ""
          });
        }).catch(error => {
      this.setState({
        message: "Invalid username or password",
      });
    });
  };

  handleSignup = () => {
    //request to server to add a new username/password
    axios.post("/user/", {
      username: this.state.username,
      password: this.state.password
    })
        .then(response => {
          console.log(response);
          if (!response.data.error) {
            console.log("successful signup");
            // Automatically log user in after sign up
            this.handleLogin();
          } else {
            this.setState({
              message: "Username already taken",
            });
          }
        }).catch(err => {
      console.log(err);
    });
  };

  handleGuest = () => {
    // Generate random username
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    this.props.loginHandler({
      loggedIn: true,
      username: "User#" + randomNumber
    });
  };

  render() {
    return (
        <div className="login-popup-modal">
        <Modal show={this.props.showLogin}
               modalClosed={this.props.hideLoginHandler}>

          <LoginForm handleSubmit={this.handleSubmit}
                     handleChange={this.handleChange}
                     message={this.state.message}/>
        </Modal>
        </div>
    );
  }
};

export default LoginPopup;