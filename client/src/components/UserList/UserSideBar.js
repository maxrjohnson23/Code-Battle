import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import UserList from './UserList';
import LiveChat from '../LiveChat';


class Sidebar extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
      <Menu right noOverlay>
        <UserList pubnub={this.props.pubnub} defaultChannel={this.props.defaultChannel}/>
        <LiveChat
              defaultChannel={"Channel-main"}
              username={this.props.username}
              pubnub={this.props.pubnub}/>
      </Menu>
    );
  }
}

export default Sidebar;