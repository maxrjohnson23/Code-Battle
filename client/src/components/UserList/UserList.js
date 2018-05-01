import React, {Component} from 'react';
import User from "./User/User";
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
    this.props.pubnub.unsubscribe({
      channels: [this.props.defaultChannel]
    });
  };

  pubNubPresenceHandler = (event) => {
    console.log("Presence change: ", event);
    let updatedUserList = [...this.state.presentUsers];
    if (event.action === "join") {
      updatedUserList.push(event.uuid);
    } else if (event.action === "leave" || event.action === "timeout") {
      updatedUserList = updatedUserList.filter(u => u !== event.uuid);
    }
    this.setState({
      presentUsers: updatedUserList
    });
  };

  render() {
    return (
        <div>
          <ol>
            <h2>Current Users</h2>
            {
              this.state.presentUsers.map(username => {
                return <User key={username} username={username}/>
              })
            }
          </ol>
        </div>
    );
  }
}

export default UserList;
