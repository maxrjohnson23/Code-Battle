import React, {Component} from "react";
import qs from "query-string";
import Countdown from "react-countdown-now";
import "./Game.css";
import LiveChat from "../../components/LiveChat/LiveChat";
import CodeSpace from "../../components/CodeSpace/CodeSpace";
import UserList from "../../components/UserList/UserList";

// Renderer callback with condition
const renderer = ({minutes, seconds, completed}) => {
  if (completed) {
    // Render a completed state
    return <h4>done</h4>;
  } else {
    // Render a countdown
    return <span>{minutes}:{seconds}</span>;
  }
};

class Game extends Component {
  state = {
    gameTimeMillis: 300000,
    gameChannel: null,
    numPlayers: null
  };

  componentWillMount() {
    // Get game details from url query string
    const game = qs.parse(this.props.location.search);
    this.setState({
      gameChannel: "Channel-" + game.name,
      numPlayers: game.players
    });
  }

  componentDidMount() {
    this.props.pubnub.history(
        {
          channel: this.state.gameChannel,
          count: 10,
        },
        (status, response) => {
          // Get list of historical games and update state
          console.log("Game data", status, response);
          // set game details to state
        }
    );
  }


  render() {
    return (
        <main className="game-container">
          <div className="countdown">
            <Countdown
                date={Date.now() + this.state.gameTimeMillis}
                renderer={renderer}/>
          </div>
          <UserList pubnub={this.props.pubnub}
                    defaultChannel={this.state.gameChannel}/>
          <CodeSpace className="codespace"/>
          <div className="game-chat">
            <LiveChat
                defaultChannel={this.state.gameChannel}
                username={this.props.username}
                pubnub={this.props.pubnub}/>
          </div>
        </main>
    );
  }


}

export default Game;