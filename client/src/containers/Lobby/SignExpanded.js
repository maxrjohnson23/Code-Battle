import React, {Component} from "react";
import PropTypes from "prop-types";
import "../Lobby.css";
import {Motion, spring} from "react-motion";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

class SignExpanded extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flexState: false,
      animIsFinished: false,
      newGameName: "",
      newGameTime: ""
    };
  }

  componentDidMount() {
    this.setState({flexState: !this.state.flexState});
  }

  isFinished = () => {
    this.setState({animIsFinished: true});
  };

  inputHandler = (event) => {
    if (event.target.name === "game-name") {
      this.setState({
        newGameName: event.target.value
      });
    } else if (event.target.name === "game-time") {
      this.setState({
        newGameTime: event.target.value
      });
    }
  };

  createGame = (event) => {
    event.preventDefault();
    const game = {
      name: this.state.newGameName,
      time: this.state.newGameTime
    };
    this.props.createGame(game);
  };

  joinGame = (event) => {

    event.preventDefault();
    const game = {
      name: event.target.dataset.name,
      time: event.target.dataset.time,
      questionId: event.target.dataset.questionid
    };
    console.log('Joining game:', game);
    this.props.joinGame(game);
  };

  render() {
    return (
        <Motion
            style={{
              flexVal: spring(this.state.flexState ? 8 : 1),
            }}
            onRest={this.isFinished}
        >
          {({flexVal}) => (
              <div
                  className={this.props.type === "create" ? "createExpanded" : "joinExpanded"}
                  style={{
                    flexGrow: `${flexVal}`,
                  }}
              >
                <Motion
                    style={{
                      opacity: spring(this.state.flexState ? 1 : 0, {
                        stiffness: 300,
                        damping: 17
                      }),
                      y: spring(this.state.flexState ? 0 : 50, {
                        stiffness: 100,
                        damping: 17
                      }),
                    }}
                >
                  {({opacity, y}) => (
                      <form
                          className="logForm"
                          style={{
                            WebkitTransform: `translate3d(0, ${y}px, 0)`,
                            transform: `translate3d(0, ${y}px, 0)`,
                            opacity: `${opacity}`,
                          }}
                      >
                        <h2>{this.props.type === "create" ? "CREATE GAME" : "JOIN GAME"}</h2>

                        <div>
                          {this.props.type === "create" ? (
                              <div>
                                <Input name="game-name" type="text"
                                       placeholder="Enter Name of Game"
                                       value={this.state.newGameName}
                                       change={this.inputHandler}/>
                                <Input name="game-time" type="number"
                                       placeholder="Enter game time"
                                       value={this.state.newGameTime}
                                       change={this.inputHandler}/>
                              </div>
                          ) : (
							<div>  
							<h3>List of Games</h3>
                              <ul className='open-games'>
                                {this.props.gameList.map(game => (
                                    <li
                                        key={game.name} data-name={game.name}
                                        className='open-game'
                                        onClick={this.joinGame}>
                                      {game.name} - {game.status}
                                    </li>))}
                              </ul>
							  </div>
                          )}
                        </div>
                        <SubmitButton type={this.props.type}
                                      createGame={this.createGame}/>
                      </form>
                  )}
                </Motion>
              </div>
          )}
        </Motion>
    );
  }
}

SignExpanded.propTypes = {
  type: PropTypes.string,
  gameList: PropTypes.array,
  joinGame: PropTypes.func
};

export default SignExpanded;
