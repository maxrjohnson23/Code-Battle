import React, {Component} from "react";
import qs from "query-string";
import Countdown from "react-countdown-now";
import axios from "axios";
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
    numPlayers: null,
    questionId: null,
    questionDetails: null
  };

  componentWillMount() {
    // Get game details from url query string
    const game = qs.parse(this.props.location.search);
    const channelName = "Channel-" + game.name;

    this.setState({
      gameChannel: channelName,
      numPlayers: game.players,
      questionId: game.questionId
    });

    // Subscribe to game channel
    this.props.pubnub.subscribe({
      channels: [channelName],
    });

    // Listen for game updates
    this.props.pubnub.getMessage(channelName, (msg) => {
      console.log("Message from game channel:", msg);
    });
  }

  componentWillUnmount() {
    this.props.pubnub.unsubscribe({
      channels: [this.state.gameChannel]
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
          const createGameMessage = response.messages.filter(m => m.action = "CREATE_GAME")[0];
          console.log("Create game message", createGameMessage);
          this.setState({
            questionId: createGameMessage.entry.questionId
          });
          this.getQuestion(createGameMessage.entry.questionId);
        }
    );
  }

  getQuestion = (questionId) => {
    axios.get("/api/question/" + questionId).then(response => {
      let question = response.data.question;

      if (question) {

        question.tests = question.tests.map(t => {
          t.result = false;
          return t;
        });

        this.setState({
          questionDetails: question,
        });
      }
    });
  };


  render() {
    let codeSpace = (<h1>Loading</h1>);
    if (this.state.questionDetails) {
      codeSpace =
          <CodeSpace className="codespace"
                     questionDetails={this.state.questionDetails}/>;

    }
    return (
        <main className="game-container">
          <div className="countdown">
            <Countdown
                date={Date.now() + this.state.gameTimeMillis}
                renderer={renderer}/>
          </div>
          <UserList pubnub={this.props.pubnub}
                    defaultChannel={this.state.gameChannel}/>
          {codeSpace}
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