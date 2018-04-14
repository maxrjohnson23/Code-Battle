import React from "react";
import "./LiveChat.css";

const LiveChat = (props) => {

const imgURL = '//robohash.org/' + props.userID + '?set=set2&bgset=bg2&size=70x70';

return (
<footer className="teal">
  <form className="container">
    <div className="row">
      <div className="input-field col s10">
        <i className="prefix mdi-communication-chat" />
        <input ref="txtMessage" type="text" placeholder="Type your message" />
        <span className="chip left">
        <img src={ imgURL } />
          <span>Anonymous robot #{ props.userID }</span>
        </span>
      </div>
      <div className="input-field col s2">
        <button type="submit" className="waves-effect waves-light btn-floating btn-large">
          <i className="mdi-content-send" />
        </button>
      </div>
    </div>
  </form>
</footer>

)};

export default LiveChat;
