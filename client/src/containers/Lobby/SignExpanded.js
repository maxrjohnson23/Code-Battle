import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../Lobby.css';
import {Motion, spring} from 'react-motion';
import Input from './Input';
import SubmitButton from './SubmitButton';

class SignExpanded extends Component {
	constructor(props) {
		super(props);
		this.state = {
			flexState: false,
			animIsFinished: false,
			newGameName: "",
			newGamePlayers: ""
		};
	}

	componentDidMount() {
		this.setState({ flexState: !this.state.flexState });
	}

	isFinished = () => {
		this.setState({ animIsFinished: true });
	};

	inputHandler = (event) => {
		if(event.target.name === "game-name") {
			this.setState({
				newGameName: event.target.value
			})
		} else if (event.target.name === "players") {
      this.setState({
        newGamePlayers: event.target.value
      })
		}
	};

	createGame = (event) => {
		event.preventDefault();
		const game = {
			name: this.state.newGameName,
			players: this.state.newGamePlayers
		};
		this.props.createGame(game);
	};

	render() {
		return (
			<Motion
				style={{
					flexVal: spring(this.state.flexState ? 8 : 1),
				}}
				onRest={this.isFinished}
			>
				{({ flexVal }) => (
					<div
						className={this.props.type === 'create' ? 'createExpanded' : 'joinExpanded'}
						style={{
							flexGrow: `${flexVal}`,
						}}
					>
						<Motion
							style={{
								opacity: spring(this.state.flexState ? 1 : 0, { stiffness: 300, damping: 17 }),
								y: spring(this.state.flexState ? 0 : 50, { stiffness: 100, damping: 17 }),
							}}
						>
							{({ opacity, y }) => (
								<form
									className="logForm"
									style={{
										WebkitTransform: `translate3d(0, ${y}px, 0)`,
										transform: `translate3d(0, ${y}px, 0)`,
										opacity: `${opacity}`,
									}}
								>
									<h2>{this.props.type === 'create' ? 'CREATE GAME' : 'JOIN GAME'}</h2>

									<div>
										{this.props.type === 'create' ? (
											<div>
												<Input name="game-name" type="text" placeholder="Enter Name of Game" value={this.state.newGameName} change={this.inputHandler}/>
												<Input name="players" type="text" placeholder="Enter number of players" value={this.state.newGamePlayers} change={this.inputHandler}/>
											</div>
										) : (
											<ol>List of Games
												 {this.props.gameList.map(game => <li key={game.name}>{game.name} - Players: {game.players}</li>)}
											</ol>
										)}
									</div>
									<SubmitButton type={this.props.type} createGame={this.createGame} />
								</form>
							)}
						</Motion>
					</div>
				)}
			</Motion>
		);
	}
}

SignExpanded.PropTypes = {
	type: PropTypes.string,
};

export default SignExpanded;
