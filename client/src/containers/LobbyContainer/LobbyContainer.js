import React, {Component} from "react";
import qs from "query-string";
import Lobby from "../Lobby/Lobby";
import UserList from "../../components/UserList/UserList";
import LiveChat from "../../components/LiveChat/LiveChat";

const GAME_CHANNEL = "Channel-games";

class LobbyContainer extends Component {
  state = {
    games: []
  };

  componentWillMount() {
    this.props.pubnub.subscribe({
      channels: [GAME_CHANNEL],
    });

    this.props.pubnub.getMessage(GAME_CHANNEL, (game) => {
      console.log("New game",game);
      const updatedGames = this.state.games.concat(game.message);
      this.setState({
        games: updatedGames
      });
    });
  }

  componentDidMount() {
      this.props.pubnub.history(
        {
          channel: GAME_CHANNEL,
          count: 10,
        },
         (status, response) => {
          // Get list of historical games and update state
           console.log("Current Games", status, response);
           const updatedGames = [...this.state.games];
           response.messages.forEach(game => {
             console.log(game);
             updatedGames.push(game.entry);
           });
           this.setState({
             games: updatedGames
           });
        }
    );
  }

  createGameHandler = (game) => {
    let createMessage = {action: "CREATE_GAME", ...game};

    // Publish to active games channel
    this.props.pubnub.publish({
      message: game,
      channel: GAME_CHANNEL
    });
    // Publish to specific game channel with creation details
    this.props.pubnub.publish({
      message: createMessage,
      channel: "Channel-" + game.name
    });
    // Navigate to newly created game
    const queryString = qs.stringify(game);
    this.props.history.push({
      pathname: "/game",
      search: "?" + queryString
    });
  };

  render() {
    return (
        <div>
          <UserList pubnub={this.props.pubnub} defaultChannel={"Channel-main"}/>
          <Lobby createGame={this.createGameHandler} gameList={this.state.games}/>
          <LiveChat
              defaultChannel={"Channel-main"}
              username={this.props.username}
              pubnub={this.props.pubnub}/>
        </div>
    )
  }
};

export default LobbyContainer;