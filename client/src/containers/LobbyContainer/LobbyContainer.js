import React, {Component} from "react";
import qs from "qs";
import axios from "axios";
import Lobby from "../Lobby/Lobby";
import Sidebar from "../../components/UserList/UserSideBar";
import Leaderboard from "../../components/Leaderboard/Leaderboard";

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
      console.log("Game channel message", game);


      if (game.message.action === "GAME_CREATED") {
        game.message.status = "NEW";
        const updatedGames = this.state.games.concat(game.message);
        this.setState({
          games: updatedGames
        });
      }
      if (game.message.action === "GAME_STARTED") {
        const updatedGames = [...this.state.games];
        updatedGames.forEach((existingGame, index) => {
          if (existingGame.name === game.message.name) {
            let updatedGame = {...existingGame};
            updatedGame.status = "INPROGRESS";
            updatedGames[index] = updatedGame;
          }
        });

        this.setState({
          games: updatedGames
        });
      }
      if (game.message.action === "GAME_COMPLETED") {
        const updatedGames = [...this.state.games];
        updatedGames.forEach((existingGame, index) => {
          if (existingGame.name === game.message.name) {
            let updatedGame = {...existingGame};
            updatedGame.status = "COMPLETED";
            updatedGames[index] = updatedGame;
          }
        });
        this.setState({
          games: updatedGames
        });
      }
    });
  }

  componentDidMount() {
    const statusMap = new Map();
    statusMap.set("GAME_CREATED", "new");
    statusMap.set("GAME_STARTED", "in-progress");
    statusMap.set("GAME_COMPLETED", "completed");
    this.props.pubnub.history(
        {
          channel: GAME_CHANNEL,
          count: 10,
        },
        (status, response) => {
          // Get list of historical games and update state
          console.log("Current Games", status, response);
          const updatedGames = [...this.state.games];

          let gameStatusMap = new Map();
          response.messages.forEach(game => {
            gameStatusMap.set(game.entry.name, statusMap.get(game.entry.action));
          });

          console.log("Status map", gameStatusMap);

          gameStatusMap.forEach((value, key) => {
            updatedGames.push({name: key, status: value});
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
        game.action = "GAME_CREATED";

        const gameChannelMessage = {
          action: "GAME_CREATED",
          ...game
        };
        // Publish to active games channel
        this.props.pubnub.publish({
          message: gameChannelMessage,
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
          <div className="leaderboard-container">
            <Leaderboard/>
          </div>
          <Sidebar pubnub={this.props.pubnub} defaultChannel={"Channel-main"} username={this.props.username} presentUsers={this.props.presentUsers} usersChange={this.props.usersChange}/>

          <Lobby createGame={this.createGameHandler}
                 joinGame={this.joinGameHandler}
                 gameList={this.state.games}/>
        </div>
    );
  }
};

export default LobbyContainer;