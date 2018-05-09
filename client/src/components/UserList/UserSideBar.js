import React from "react";
import {stack as Menu} from "react-burger-menu";
import UserList from "./UserList";
import LiveChat from "../LiveChat";
import "./UserList.css";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faComment from "@fortawesome/fontawesome-free-solid/faComment";


class Sidebar extends React.Component {

  render () {
    return (
    <Menu right noOverlay customBurgerIcon={ 
    <span className="fa-layers fa-fw">
      <FontAwesomeIcon icon={faComment} size="3x" color="rgb(218, 231, 241)"/>
      <span className="counter"> {this.props.presentUsers.length} </span>
  </span> } >
        <UserList pubnub={this.props.pubnub} defaultChannel={this.props.defaultChannel} presentUsers={this.props.presentUsers} usersChange={this.props.usersChange}/>
        <LiveChat
            defaultChannel={this.props.gameChannel ? this.props.gameChannel : this.props.defaultChannel}
            username={this.props.username}
            pubnub={this.props.pubnub}/>
      </Menu>
    );
  }
}

export default Sidebar;