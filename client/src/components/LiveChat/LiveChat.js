import React, {Component} from "react";
import "./LiveChat.css";

export default class LiveChat extends Component {
//this sets the users curser into the chat -- we can remove this to change that feature
  componentDidMount() {
    this.refs.txtMessage.focus();
  }

  onSubmit = (e) => {
    e.preventDefault();
    // Check if the message is empty
    const message = this.refs.txtMessage.value;
    if (message.length === 0) {
      return;
    }
    // Build a message object and send it
    const messageObj = {
      Who: this.props.userID,
      What: message,
      When: new Date().valueOf(),
    };
    this.props.sendMessage(messageObj);
    // Clear the input field and set focus
    this.refs.txtMessage.value = "";
    this.refs.txtMessage.focus();
  };

  render() {

    const {props, onSubmit} = this;

    const imgURL = "//robohash.org/" + props.userID + "?set=set2&bgset=bg2&size=70x70";

    return (<footer className="teal">

      <form className="container" onSubmit={onSubmit}>
        <div className="row">
          <div className="input-field col s10">
            <i className="prefix mdi-communication-chat"/>
            <input ref="txtMessage" type="text"
                   placeholder="Type your message"/>
            <span className="chip left">
          <img src={imgURL}/>
          <span>Anonymous robot #{props.userID}</span>
        </span>
          </div>
          <div className="input-field col s2">
            <button type="submit"
                    className="waves-effect waves-light btn-floating btn-large">
              <i className="mdi-content-send"/>
            </button>
          </div>
        </div>
      </form>
    </footer>);
  }
};
