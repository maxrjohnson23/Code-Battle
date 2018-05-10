import React, {Component} from "react";
import User from "./User/User";
import "./UserList.css"
import Fade from 'react-reveal/Fade';

// import Sidebar from './UserSideBar';

class UserList extends Component {
  state = {
    presentUsers: []
  };

  componentDidMount() {

    this.props.pubnub.subscribe({
      channels: [this.props.defaultChannel],
      withPresence: true,
    });

    this.props.pubnub.getPresence(this.props.defaultChannel, (event) => this.pubNubPresenceHandler(event));

    // Get current user list
    this.props.pubnub.hereNow(
        {
          channels: [this.props.defaultChannel],
          includeUUIDs: true
        },
        (status, response) => {
          if (status.statusCode === 200) {
            console.log("Channel users: ", response);
            let channelUsers = response.channels[this.props.defaultChannel].occupants.map(p => p.uuid);
            this.setState({
              presentUsers: channelUsers
            });
          }
        }
    );

  }

  componentWillUnmount() {
    console.log("Unsubscribing: ", this.props.defaultChannel);
    this.props.pubnub.unsubscribe({
      channels: [this.props.defaultChannel, this.props.defaultChannel + "-pnpres"]
    });
  };

  pubNubPresenceHandler = (event) => {
    console.log("Presence change: ", event);
    let updatedUserList = [...this.state.presentUsers];
    if (event.action === "join") {
      if (!updatedUserList.includes(event.uuid)) {
        updatedUserList.push(event.uuid);
      }
    } else if (event.action === "leave" || event.action === "timeout") {
      updatedUserList = updatedUserList.filter(u => u !== event.uuid);
    }
    console.log("Updated user list: ", updatedUserList);
    this.setState({
      presentUsers: updatedUserList
    });
  };

  render() {
    return (
      <div>
        <h2>Current Users</h2>
        <div className="userListStyle">
        <Fade bottom cascade>
          <ol>
            {
              this.state.presentUsers.map(username => {
                return <User key={username} username={username}/>;
              })
            }
          </ol>
        </Fade>
        </div>
      </div>
    );
  }
}

export default UserList;
