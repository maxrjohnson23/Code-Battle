import React from "react";
import "./ChatHistory.css";

export default class ChatHistory extends React.Component {

  render() {

    const {props} = this; // same as `const props = this.props;`

    return (
      <div className="chatbox">
        <ul className="collection">
          {props.history.map((messageObj) => {

            const imgURL = "//robohash.org/" + messageObj.message.Who + "?set=set2&bgset=bg2&size=70x70";
            const messageDate = new Date(messageObj.message.When);
            const messageDateTime = messageDate.toLocaleDateString() + " at " + messageDate.toLocaleTimeString();

            return (
                <li className="collection-item avatar"
                    key={messageObj.message.When}>
                  <img src={imgURL} alt={messageObj.Who} className="circle"/>
                  <span
                      className="title">{messageObj.message.Who}</span>
                    <i className="prefix mdi-action-alarm"/>
                    <span className="message-date">{messageDateTime}</span>
                    <span className="messageText">{messageObj.message.What}</span>
                </li>
            );
          })}
        </ul>
      </div>
    );
  }
}