import React, {Component} from "react";
import qs from "qs";
import Countdown from "react-countdown-now";
import axios from "axios";
import "./Game.css";
import CodeSpace from "../../components/CodeSpace/CodeSpace";
import Sidebar from "../../components/UserList/UserSideBar";
import GameSummaryPopup
  from "../../components/GameSummaryPopup/GameSummaryPopup";
import Spinner from "../../components/UI/Spinner/Spinner";
import Wrapper from "../../hoc/Wrapper/Wrapper";

const DEFAULT_POINTS = 100;

// Renderer callback with condition
const renderer = ({minutes, seconds, completed}) => {
  if (completed) {
    // Render a completed state
    return <h4>Time's up!</h4>;
  } else {
    // Render a countdown
    return <span>{minutes}:{seconds}</span>;
  }
};

class Game extends Component {
  state = {
    gameTimeMillis: 0,
    gameStarted: false,
    gameEnded: false,
    gameChannel: null,
    startTimeMillis: null,
    questionId: null,
    questionDetails: null,
    isGameCreator: false,
    leaderBoard: []
  };

  countdown = (e) => {
    this.setState({gameTimeMillis: e.total});
  };

  timeFinishedHandler = () => {
    console.log('Time up');
    this.setState({
      gameEnded: true
    });
  };

  componentWillMount() {
    // Get game details from url query string
    const game = qs.parse(this.props.location.search.slice(1));
    const channelName = "Channel-" + game.name;

    this.setState({
      gameChannel: channelName,
      startTimeMillis: parseInt(game.time, 10),
      gameTimeMillis: parseInt(game.time, 10),
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
          gameStarted: true,
        });
      }
      if (msg.message.action === "GAME_WIN") {
        console.log("Game created:", msg);
        const updatedLeaderboard = [...this.state.leaderBoard];
        const submissionDetails = {
          username: msg.message.username,
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
            const gameCreatedMessage = response.messages.filter(m => m.entry.action === "GAME_CREATED")[0];
            const gameStartedMessage = response.messages.filter(m => m.entry.action === "GAME_START")[0];
            const gameWinMessages = response.messages.filter(m => m.entry.action === "GAME_WIN");

            // Joining an in-progress game - need to sync up the clock
            if (gameStartedMessage) {
              this.syncGameProgress(gameStartedMessage, gameWinMessages);
            }
          }
        }
    );
    // Retrieve question details from the server
    this.getQuestion();

  }

  syncGameProgress(gameStartedMessage, gameWinMessages) {
    // Sync game time
    const currentTimeMillis = Date.now();
    const timeSinceGameStarted = Math.floor(currentTimeMillis - gameStartedMessage.timetoken / 10000);
    const timeRemaining = gameStartedMessage.entry.time - timeSinceGameStarted;

    // Sync leaderboard details
    if (gameWinMessages.length > 0) {
      console.log('Game wins', gameWinMessages);
      const updatedLeaderboard = [...this.state.leaderBoard];
      gameWinMessages.forEach(submission => {
        console.log(submission);
        const winData = {
          username: submission.entry.username,
          userCode: submission.entry.code,
          time: submission.entry.time
        };
        updatedLeaderboard.push(winData);

      });
      this.setState({
        leaderBoard: updatedLeaderboard
      });

    }

    this.setState({
      gameStarted: true,
      gameTimeMillis: timeRemaining,
      gameEnded: timeRemaining <= 0,
    });
  }

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
    this.persistUserScore();
    const message = {
      action: "GAME_WIN",
      username: this.props.username,
      code: userCode,
      time: this.state.startTimeMillis - this.state.gameTimeMillis
    };
    this.props.pubnub.publish({
      channel: this.state.gameChannel,
      message: message,
    });
  };

  startGame = () => {
    this.props.pubnub.publish({
      channel: this.state.gameChannel,
      message: {action: "GAME_START", time: this.state.startTimeMillis},
    });
    this.setState({
      gameStarted: true
    });
  };

  persistUserScore = () => {
    let myUsername = this.props.username;
    let userRanking = this.state.leaderBoard.findIndex(rank => {
      return rank.username === myUsername;
    });
    if (userRanking === -1) {
      // message hasn't reached yet, set last
      userRanking = this.state.leaderBoard.length;
    }
    console.log("userRanking", userRanking);
    let pointsAwarded = DEFAULT_POINTS;

    // increment for 1st, 2nd, 3rd place
    switch (userRanking) {
      case 0: {
        pointsAwarded += 400;
        break;
      }
      case 1: {
        pointsAwarded += 300;
        break;
      }
      case 2: {
        pointsAwarded += 200;
        break;
      }
      default:
        break;
    }

    // Update user on server
    axios.patch(`/user/${myUsername}`, {score: pointsAwarded});
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
                  onTick={this.countdown}
                  onComplete={this.timeFinishedHandler}/>
            </div>

            {codeSpace}
          </Wrapper>
      );
    }

    return (
        <main className="game-container">
          <GameSummaryPopup showSummary={this.state.gameEnded}
                            gameResults={this.state.leaderBoard}/>
          <Sidebar pubnub={this.props.pubnub}
                   defaultChannel={this.state.gameChannel}
                   gameChannel={this.state.gameChannel + "-chat"}/>

          {game}
        </main>
    );
  }


}

export default Game;