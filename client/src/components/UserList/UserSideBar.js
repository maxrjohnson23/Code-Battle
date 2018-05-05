import React from "react";
import {stack as Menu} from "react-burger-menu";
import UserList from "./UserList";
import LiveChat from "../LiveChat";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faComment from "@fortawesome/fontawesome-free-solid/faComment";


class Sidebar extends React.Component {

  render () {
    const customIcon = <FontAwesomeIcon className="fa-cog" icon={faComment}/>
    return (
    <Menu right noOverlay customBurgerIcon={ customIcon } >
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