import React from "react";
import "./Chatroom.css";

export default class Chatroom extends React.Component {

  render() {

    const {props} = this; // same as `const props = this.props;`

    return (
        <ul className="list-group online-users"></ul>
    );
  }
}