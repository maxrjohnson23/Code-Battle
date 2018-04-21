import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    message: "",
    hasError: false
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = (event) => {
    console.log("sign-up handleSubmit, username: ");
    console.log(this.state.username);
    event.preventDefault();

    //request to server to add a new username/password
    axios.post("/user/", {
      username: this.state.username,
      password: this.state.password
    })
        .then(response => {
          console.log(response);
          if (!response.data.error) {
            console.log("successful signup");
            this.setState({
              redirectTo: "/login"
            });
          } else {
            this.setState({
              message: "Username already taken",
              hasError: true
            });
          }
        }).catch(err => {
      console.log(err);
    });
  };


  render() {
    const messageColor = this.state.hasError ? "red" : "green";


    if (this.state.redirectTo) {
      return <Redirect to={{pathname: this.state.redirectTo}}/>;
    } else return (
        <div className="SignupForm">
          <h4>Sign up</h4>
          <h5 style={{color: messageColor}}>{this.state.message}</h5>
          <form className="form-horizontal">
            <div className="form-group">
              <div className="col-1 col-ml-auto">
                <label className="form-label"
                       htmlFor="username">Username</label>
              </div>
              <div className="col-3 col-mr-auto">
                <input className="form-input"
                       type="text"
                       id="username"
                       name="username"
                       placeholder="Username"
                       value={this.state.username}
                       onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-1 col-ml-auto">
                <label className="form-label"
                       htmlFor="password">Password: </label>
              </div>
              <div className="col-3 col-mr-auto">
                <input className="form-input"
                       placeholder="password"
                       type="password"
                       name="password"
                       value={this.state.password}
                       onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group ">
              <div className="col-7"></div>
              <button
                  className="btn btn-primary col-1 col-mr-auto"
                  onClick={this.handleSubmit}
                  type="submit"
              >Sign up
              </button>
            </div>
          </form>
        </div>

    );
  }
}

export default SignUp;