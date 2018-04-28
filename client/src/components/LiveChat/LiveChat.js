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

    return (
    <section className="chatEntry">
      <header className="top-bar">
        <h1 className="chatHeader">Channel Chat</h1>
      </header>

        <ol className="collection">
          {props.history.map((messageObj) => {

            const imgURL = "//robohash.org/" + messageObj.message.Who + "?set=set2&bgset=bg2&size=70x70";
            const messageDate = new Date(messageObj.message.When);
            const messageDateTime = /*messageDate.toLocaleDateString() + " at " +*/ messageDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

            return (
                <li className="collection-item" key={messageObj.message.When}>
                <div className="avatar">
                  <img src={imgURL} alt={messageObj.Who}/>
                </div>
                  <div className="messageContainer">
                    <p className="messageText">
                      {messageObj.message.What}
                    </p>
                    <span className="title">{messageObj.message.Who} {messageDateTime}</span>
                    </div>
                </li>
            );
          })}
        </ol>

      <form className="container" onSubmit={onSubmit}>
        <img className="avatar" src={imgURL}/>
          <input className="chatInput" ref="txtMessage" type="text"
                   placeholder="Type your message"/>
      </form>
    </section>);
  }
};
