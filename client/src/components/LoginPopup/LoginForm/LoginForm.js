import React from "react";
import "./LoginForm.css";

const loginForm = (props) => (

    <div className="loginContainer">
      <h4>Login</h4>
      <h5 style={{color: "red"}}>{props.message}</h5>
      <div className="login-item">
        <form action="" method="post" className="form form-login">
          <div className="form-field">
            <label className="user" htmlFor="login-username"><span
                className="hidden">Username</span></label>
            <input id="login-username" type="text"
                   className="form-input" placeholder="Username"
                   required
                   name="username"
                   value={props.username}
                   onChange={props.handleChange}/>
          </div>

          <div className="form-field">
            <label className="lock" htmlFor="login-password"><span
                className="hidden">Password</span></label>
            <input id="login-password" type="password"
                   className="form-input" placeholder="Password"
                   required
                   name="password"
                   value={props.password}
                   onChange={props.handleChange}/>
          </div>

          <div className="form-field">
            <input type="submit" value="Log in" className="login-btn"
                   onClick={(event) => props.handleSubmit(event, "login")}
            />
          </div>
          <div className="form-field">
            <input className="signup-btn" type="submit" value="Sign up"
                   onClick={(event) => props.handleSubmit(event, "signup")}
            />
          </div>
          <div className="form-field">
            <input className="guest-btn" type="submit" value="Continue as Guest"
                   onClick={(event) => props.handleSubmit(event, "guest")}
            />
          </div>
        </form>

      </div>
    </div>
);


export default loginForm;