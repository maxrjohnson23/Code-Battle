import React, {Component} from "react";
import "./LiveChat.css";

export default class LiveChat extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    console.log("Joining chat channel" + this.props.defaultChannel);
    this.props.pubnub.subscribe({
      channels: [this.props.defaultChannel],
      withPresence: true,
    });

    this.props.pubnub.getMessage(this.props.defaultChannel, (msg) => {
      const updatedMessages = this.state.messages.concat(msg);
      this.setState({
        messages: updatedMessages
      });
    });
  }

  componentWillUnmount() {
    this.props.pubnub.unsubscribe({
      channels: [this.props.defaultChannel]
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    // Check if the message is empty
    const message = this.refs.txtMessage.value;
    if (message.length === 0) {
      return;
    }
    // Build a message object and send it
    const messageObj = {
      Who: this.props.username,
      What: message,
      When: new Date().valueOf(),
    };
    this.sendMessage(messageObj);
    // Clear the input field and set focus
    this.refs.txtMessage.value = "";
    this.refs.txtMessage.focus();
  };

  sendMessage = (message) => {
    this.props.pubnub.publish({
      channel: this.props.defaultChannel,
      message: message,
    });
    console.log(message);
  };

  render() {

    const {props, onSubmit} = this;

    const imgURL = "//robohash.org/" + props.userID + "?set=set2&bgset=bg2&size=70x70";

    return (
    <section className="chatEntry">
      <header className="top-bar">
        <h1 className="chatHeader">Chat</h1>
      </header>

        <ol className="collection">
          {this.state.messages.map((messageObj) => {

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
                   placeholder="Let's play a game!"/>
      </form>
    </section>);
  }
};
