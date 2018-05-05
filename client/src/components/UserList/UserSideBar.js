import React from "react";
import {stack as Menu} from "react-burger-menu";
import UserList from "./UserList";
import LiveChat from "../LiveChat";


class Sidebar extends React.Component {

  render () {
    return (
      <Menu right noOverlay>
        <UserList pubnub={this.props.pubnub} defaultChannel={this.props.defaultChannel}/>
        <LiveChat
            defaultChannel={this.props.gameChannel ? this.props.gameChannel : this.props.defaultChannel}
            username={this.props.username}
            pubnub={this.props.pubnub}/>
      </Menu>
    );
  }
}

export default Sidebar;