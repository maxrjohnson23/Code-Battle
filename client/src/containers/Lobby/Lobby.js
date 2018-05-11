import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Lobby.css';
import Sign from './Sign';
import SignExpanded from './SignExpanded';
import SignCollapsed from './SignCollapsed';

class Lobby extends Component {
	constructor(props) {
		super(props);
		this.state = {
			wasClickedLeft: false,
			wasClickedRight: false,
			showUserModal: false,
		};
	}

	showUserModal = event => {
		event.preventDefault();
		this.setState({
			showUserModal: true,
		});
	};

	onReset = () => {
		this.setState({
			wasClickedLeft: false,
			wasClickedRight: false,
		});
	};

	//activate create game portion of lobby
	onClickLeft = () => {
		this.setState({ wasClickedLeft: !this.state.wasClickedLeft }, function() {
			if (this.state.wasClickedRight === true && this.state.wasClickedLeft === true) {
				this.setState({ wasClickedRight: false });
			}
		});
	};

	//activate join game portion of lobby
	onClickRight = () => {
		this.setState({ wasClickedRight: !this.state.wasClickedRight }, function() {
			if (this.state.wasClickedRight === true && this.state.wasClickedLeft === true) {
				this.setState({ wasClickedLeft: false });
			}
		});
	};

	render() {
		let lobbyContent = null;

		//inital view of lobby
		if (this.state.wasClickedLeft === false && this.state.wasClickedRight === false) {
			lobbyContent = (
				<div className="Lobby">
					<Sign type="create" onChange={this.onClickLeft} />
					<Sign type="join" onChange={this.onClickRight} />
				</div>
			);
		}

		//join game view
		else if (this.state.wasClickedLeft === false && this.state.wasClickedRight === true) {
			lobbyContent = (
				<div className="Lobby">
					<SignCollapsed type="create" onChange={this.onClickLeft} />
					<SignExpanded type="join" gameList={this.props.gameList} joinGame={this.props.joinGame} />
				</div>
			);
		}

		//create game view
		else if (this.state.wasClickedLeft === true && this.state.wasClickedRight === false) {
			lobbyContent = (
				<div className="Lobby">
					<SignExpanded
						type="create"
						createGame={this.props.createGame}
						createCustomGame={this.props.createCustomGame}
					/>
					<SignCollapsed type="join" onChange={this.onClickRight} />
				</div>
			);
		}

		return <div id="lobby-content">{lobbyContent}</div>;
	}
}

Lobby.propTypes = {
	onSubmit: PropTypes.func,
};

export default Lobby;
