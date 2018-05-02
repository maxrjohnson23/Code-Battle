import React, {Component} from "react";
import qs from "qs";
import Countdown from "react-countdown-now";
import axios from "axios";
import "./Game.css";
import LiveChat from "../../components/LiveChat/LiveChat";
import CodeSpace from "../../components/CodeSpace/CodeSpace";
import Sidebar from "../../components/UserList/UserSideBar";
import Spinner from "../../components/UI/Spinner/Spinner"
import Wrapper from "../../hoc/Wrapper/Wrapper";

const DEFAULT_TIME = 300000;

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
    gameTimeMillis: DEFAULT_TIME,
    gameStarted: false,
    gameChannel: null,
    numPlayers: null,
    questionId: null,
    questionDetails: null,
    isGameCreator: false,
    leaderBoard: []
  };

  countdown = (e) => {
    this.setState({gameTimeMillis: e.total});
    if (this.state.isGameCreator) {
      const message = {
        action: "GAME_SYNC_CLOCK",
        username: this.props.username,
        timeMillis: e.total
      };
      this.props.pubnub.publish({
        channel: this.state.gameChannel,
        message: message,
      });
    }
  };

  componentWillMount() {
    // Get game details from url query string
    const game = qs.parse(this.props.location.search.slice(1));
    const channelName = "Channel-" + game.name;

    this.setState({
      gameChannel: channelName,
      numPlayers: game.players,
      questionId: game.questionId,
      isGameCreator: game.created
    });

    // Subscribe to game channel
    this.props.pubnub.subscribe({
      channels: [channelName],
    });

    // Listen for game updates
    this.props.pubnub.getMessage(channelName, (msg) => {
      console.log("Message from game channel:", msg);
      if (msg.message.action === "GAME_START") {
        this.setState({
          gameStarted: true
        });
      }
      if (msg.message.action === "GAME_WIN") {
        console.log("Game created:", msg);
        const updatedLeaderboard = [...this.state.leaderBoard];
        const submissionDetails = {
          username: msg.message.publisher,
          userCode: msg.message.code,
          time: msg.message.time
        };
        updatedLeaderboard.push(submissionDetails);
        this.setState({
          leaderBoard: updatedLeaderboard
        })
      }
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
          count: 10000,
        },
        (status, response) => {
          // Get list of historical game messages and update state
          console.log("Game channel data", status, response);
          if (response.messages.length !== 0) {
            const gameAlreadyStarted = response.messages.filter(m => m.entry.action === "GAME_START");

            if (gameAlreadyStarted.length !== 0) {
              this.syncWithInProgressGame(response.messages);
            }
          }
        }
    );
    // Retrieve question details from the server
    this.getQuestion();

  }

  syncWithInProgressGame = (messages) => {
    const clockSyncMessages = messages.filter(m => m.entry.action === "GAME_SYNC_CLOCK");
    const latestClockTime = clockSyncMessages[clockSyncMessages.length - 1].entry.timeMillis;

    this.setState({
      gameStarted: true,
      gameTimeMillis: latestClockTime,
    });
  };

  getQuestion = () => {
    axios.get("/api/question/" + this.state.questionId).then(response => {
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

  publishGameWin = (userCode) => {
    const message = {
      action: "GAME_WIN",
      username: this.props.username,
      code: userCode,
      time: DEFAULT_TIME - this.state.gameTimeMillis
    };
    this.props.pubnub.publish({
      channel: this.state.gameChannel,
      message: message,
    });
  };

  startGame = () => {
    this.props.pubnub.publish({
      channel: this.state.gameChannel,
      message: {action: "GAME_START"},
    });
    this.setState({
      gameStarted: true
    });
  };


  render() {
    let codeSpace = (<Spinner/>);
    if (this.state.questionDetails) {
      codeSpace =
          <CodeSpace className="codespace"
                     questionDetails={this.state.questionDetails}
                     publishWin={this.publishGameWin}/>;
    }

    let game = (<div>
          <h1>Waiting for game to start</h1>
          <Spinner/>
          {this.state.isGameCreator ?
              <button onClick={this.startGame}>Start Game</button> : null}
        </div>
    );

    if (this.state.gameStarted) {
      game = (
          <Wrapper>
            <div className="countdown">
              <Countdown
                  date={Date.now() + this.state.gameTimeMillis}
                  renderer={renderer}
                  controller
                  onTick={this.countdown}/>
            </div>

            {codeSpace}
            <div className="game-chat">
              <LiveChat
                  defaultChannel={this.state.gameChannel + "-chat"}
                  username={this.props.username}
                  pubnub={this.props.pubnub}/>
            </div>
          </Wrapper>
      );
    }

    return (
        <main className="game-container">
          <Sidebar pubnub={this.props.pubnub}
                   defaultChannel={this.state.gameChannel}/>

          {game}
        </main>
    );
  }


}

export default Game;