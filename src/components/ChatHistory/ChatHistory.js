import React from "react";
import "./ChatHistory.css";

const ChatHistory = props => (

<ul className="collection">
  <li className="collection-item avatar">
    <img src="//robohash.org/107378?set=set2&bgset=bg2&size=70x70" alt="107378" className="circle" />
    <span className="title">Anonymous robot #107378</span>
    <p>
      <i className="prefix mdi-action-alarm" />
      <span className="message-date">05/19/2016 at 1:55PM</span>
      <br />
      <span>Hello World!</span>
    </p>
  </li>
</ul>
)

export default ChatHistory;