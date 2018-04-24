import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import Modal from "../UI/Modal/Modal";
import axios from "axios";
import "./LoginForm.css";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    redirectTo: null,
    loginPhase: true,
    message: ""
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");

    axios
        .post("/user/login", {
          username: this.state.username,
          password: this.state.password
        })
        .then(response => {
          console.log("login response: ");
          console.log(response);
          if (response.status === 200) {
            // update App.js state
            this.props.updateUser({
              loggedIn: true,
              username: response.data.username
            });
            // update the state to redirect to home
            this.setState({
              redirectTo: "/",
              loginPhase: false
            });
          }
        }).catch(error => {
      this.setState({
        message: "Invalid username or password"
      });

    });
  };

  render() {

    if (this.state.redirectTo) {
      return <Redirect to={{pathname: this.state.redirectTo}}/>;
    } else {
      return (
          <Modal show={this.state.loginPhase}
                 modalClosed={() => this.setState({
                   loginPhase: false,
                   redirectTo: "/"
                 })}>

            <div className="loginContainer">
              <h4>Login</h4>
              <h5 style={{color: "red"}}>{this.state.message}</h5>
              <div className="login-item">
                <form action="" method="post" className="form form-login">
                  <div className="form-field">
                    <label className="user" htmlFor="login-username"><span
                        className="hidden">Username</span></label>
                    <input id="login-username" type="text"
                           className="form-input" placeholder="Username"
                           required
                           name="username"
                           value={this.state.username}
                           onChange={this.handleChange}/>
                  </div>

                  <div className="form-field">
                    <label className="lock" htmlFor="login-password"><span
                        className="hidden">Password</span></label>
                    <input id="login-password" type="password"
                           className="form-input" placeholder="Password"
                           required
                           name="password"
                           value={this.state.password}
                           onChange={this.handleChange}/>
                  </div>

                  <div className="form-field">
                    <input type="submit" value="Log in"
                           onClick={this.handleSubmit}
                    />
                  </div>
                </form>

              </div>
            </div>
          </Modal>);
    }
  }
}

export default LoginForm;