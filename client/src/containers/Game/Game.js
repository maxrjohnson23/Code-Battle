import React, {Component} from "react";
import Countdown from "react-countdown-now";
import "./Game.css";
import LiveChat from "../../components/LiveChat/LiveChat";
import CodeSpace from "../../components/CodeSpace/CodeSpace";

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
    gameTimeMillis: 300000
  };

  render() {
    return (
        <main className="game-container">
          <div className="countdown">
            <Countdown
                date={Date.now() + this.state.gameTimeMillis}
                renderer={renderer}/>
          </div>
          <CodeSpace className="codespace"/>
          <div className="game-chat">
            <LiveChat userID={this.props.username}
                      sendMessage={this.props.sendMessage}
                      history={this.props.history}/>
          </div>
        </main>
    );
  }


}

export default Game;