import React, {Component} from "react";
import qs from "qs";
import axios from "axios";
import Lobby from "../Lobby/Lobby";
import Sidebar from "../../components/UserList/UserSideBar";

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
      console.log("New game", game);
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
            updatedGames.push(game.entry);
          });
          this.setState({
            games: updatedGames
          });
        }
    );
  }

  componentWillUnmount() {
    this.props.pubnub.unsubscribe({
      channels: [GAME_CHANNEL]
    });
  }

  createGameHandler = (game) => {

    // Choose random question for game
    axios.get("/api/question/random").then(res => {
      if (res.data) {
        game.questionId = res.data.question._id;
        game.created = true;

        // Publish to active games channel
        this.props.pubnub.publish({
          message: game,
          channel: GAME_CHANNEL
        });

        let gameDetails = {
          action: "CREATE_GAME",
          questionId: res.data.question._id,
          ...game
        };
        // Publish to specific game channel with creation details
        this.props.pubnub.publish({
          message: gameDetails,
          channel: "Channel-" + game.name
        });
        // Navigate to newly created game
        const queryString = qs.stringify(game);
        this.props.history.push({
          pathname: "/game",
          search: "?" + queryString
        });
      }
    });

  };

  joinGameHandler = (game) => {
    // Navigate to existing game
    const queryString = qs.stringify(game);
    this.props.history.push({
      pathname: "/game",
      search: "?" + queryString
    });
  };

  render() {
    return (
        <div id='main-container'>
          <Sidebar pubnub={this.props.pubnub} defaultChannel={"Channel-main"} username={this.props.username}/>
          <Lobby createGame={this.createGameHandler}
                 joinGame={this.joinGameHandler}
                 gameList={this.state.games}/>
          {/* <LiveChat
              defaultChannel={"Channel-main"}
              username={this.props.username}
              pubnub={this.props.pubnub}/> */}
        </div>
    );
  }
};

export default LobbyContainer;