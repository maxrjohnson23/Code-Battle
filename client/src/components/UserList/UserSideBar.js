import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import UserList from './UserList';


class Sidebar extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
      <Menu right noOverlay>
        <UserList pubnub={this.props.pubnub} defaultChannel={this.props.defaultChannel}/>
        {/* <h2> Current Users </h2>
            <a onClick={ this.showSettings } className="menu-item--small" href="">User 1</a>
            <a onClick={ this.showSettings } className="menu-item--small" href="">User 2</a>
            <a onClick={ this.showSettings } className="menu-item--small" href="">User 3</a>
            <a onClick={ this.showSettings } className="menu-item--small" href="">User 4</a> */}
      </Menu>
    );
  }
}

export default Sidebar;