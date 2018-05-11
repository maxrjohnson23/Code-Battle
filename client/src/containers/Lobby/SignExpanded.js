import React, {Component} from "react";
import PropTypes from "prop-types";
import "../Lobby.css";
import {Motion, spring} from "react-motion";
import Input from "./Input";
import CustomQuestion from "./CustomQuestion";
import CreateQuestion from "../../components/CreateQuestion/CreateQuestion";
import SubmitButton from "./SubmitButton";
import Fade from 'react-reveal/Fade';
import {MdSearch} from 'react-icons/lib/md/search';

class SignExpanded extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flexState: false,
      animIsFinished: false,
      newGameName: "",
      newGameTime: "",
      createNewQuestion: false,
      initialList: [],
      filteredList: []
    };
    this.customQuestion = this.customQuestion.bind(this);
  }

  componentWillMount() {
    this.setState({initialList: this.props.gameList})
  };

  componentDidMount() {
    this.setState({flexState: !this.state.flexState});
    if (this.props.type === 'join'){
    this.setState({filteredList: this.state.initialList.map(game => {
      let names = '';
      names = game.name;
      return names.toLowerCase();
    })});
  }
  };

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

  filterList = (event) => {
    let updatedList = this.state.filteredList.filter(item => {
      return item.search(
        event.target.value.toLowerCase()
      ) !== -1
    });
    if (event.target.value === ''){
      this.setState({filteredList: this.state.initialList.map(game => {
        let names = '';
        names = game.name;
        return names.toLowerCase();
      })});
    } else{
    this.setState({filteredList: updatedList})
    }
  };

  customQuestion = (event) => {
    event.preventDefault();
    console.log('custom question pressed')
    this.setState({
      createNewQuestion: true
    }
  );
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
                        <div id='create-main'>
                          {this.props.type === "create" ? (
                            <div id='create-main-child'>
                            {this.state.createNewQuestion ? (
                              <div id='create-question-container'>
                                <CreateQuestion />
                              </div>
                          
                                ) : (
                                <div id='create-game-container'>
                                <Input name="game-name" type="text"
                                       placeholder="Enter Name of Game"
                                       value={this.state.newGameName}
                                       change={this.inputHandler}
                                       required/>
                                <Input name="game-time" type="time"
                                       placeholder="Enter game time"
                                       value={this.state.newGameTime}
                                       change={this.inputHandler}
                                       required/>
                                </div>
                                )
                              }
                              </div>
                          ) : (
              <div id='join-game-section'>
              <div className='search'>
                <input
                  type='text' 
                  id='game-search'
                  placeholder='search games'
                  onChange={this.filterList}
                  onKeyDown={this.filterList}/>
              </div>
              <Fade bottom cascade>
							<div>
                              <ul className='open-games'>
                                {this.props.gameList.map(game => {
                                  let statusClass = `game-${game.status}`;
                                  return (
                                      <li
                                          key={game.name} data-name={game.name}
                                          className='open-game'
                                          onClick={this.joinGame}>
                                        {game.name}<span className={statusClass}>{game.status}</span>
                                      </li>)
                                })}
                              </ul>
							  </div>
                </Fade>
                </div>
                          )}
                        </div>
                        <div>
                        {this.props.type === "create" ? (

                          <div id='button-section'>
                          {!this.state.createNewQuestion ? (
                            <div className='button-section-child'>
                            <CustomQuestion
                              onClick={this.customQuestion}
                              />
                          <SubmitButton type={this.props.type}
                                        createGame={this.createGame}/>
                            </div>
                          ) : (null)}
                          </div>
                        ) : (null)
                      }
                        </div>
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
