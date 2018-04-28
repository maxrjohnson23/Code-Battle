import React from "react";
import Lobby from "../Lobby/Lobby";
import UserList from "../../components/UserList/UserList";
import LiveChat from "../../components/LiveChat/LiveChat";


const lobbyContainer = (props) => {
  return (
      <div>
        <UserList users={props.users}/>
        <Lobby/>
        <LiveChat
            username={props.username}
            sendMessage={props.sendMessage}
            history={props.history}/>
      </div>
  )
};

export default lobbyContainer;