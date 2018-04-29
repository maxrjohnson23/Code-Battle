import React from "react";
import Lobby from "../Lobby/Lobby";
import UserList from "../../components/UserList/UserList";
import LiveChat from "../../components/LiveChat/LiveChat";


const lobbyContainer = (props) => {
  return (
      <div>
        <UserList pubnub={props.pubnub} defaultChannel={"Channel-main"}/>
        <Lobby/>
        <LiveChat
            defaultChannel={"Channel-main"}
            username={props.username}
            pubnub={props.pubnub}/>
      </div>
  )
};

export default lobbyContainer;