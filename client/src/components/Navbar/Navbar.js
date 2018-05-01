import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import "../../App.css";
import "./Navbar.css";
import axios from "axios";

class Navbar extends Component {

  componentDidMount() {
    console.log(this.props);
  }

  logout = (event) => {
    event.preventDefault();
    console.log("logging out");
    axios.post("/user/logout").then(response => {
      console.log(response.data);
      if (response.status === 200) {
        this.props.loginHandler({
          loggedIn: false,
          username: null
        });
        this.props.history.push("/");
      }
    }).catch(error => {
      console.log("Logout error" + error);
    });
  };

  render() {
    return (
        <nav className="navbar">
          <section className="navbar-section">
            <Link to="/" className="logo btn btn-link">
              <span className="text-secondary">Code Battle</span>
            </Link>
          </section>
          <section className="navbar-section">
            {this.props.loggedIn ? (
                [
                  <Link key="username" to="#" className="btn btn-link">
                    <span
                        className="text-secondary">Welcome {this.props.username}</span>
                  </Link>,
                  <Link key="logout" to="#" className="btn btn-link"
                        onClick={this.logout}>
                    <span className="text-secondary">Logout</span>
                  </Link>
                ]
            ) : (
                [
                  <Link key="home" to="/" className="btn btn-link">
                    <span className="text-secondary">Home</span>
                  </Link>,
                  <Link key="login" to="/" className="btn btn-link"
                        onClick={this.props.showLoginHandler}>
                    <span className="text-secondary">Login</span>
                  </Link>
                ]
            )}
          </section>
        </nav>
    );

  }
}

export default withRouter(Navbar);