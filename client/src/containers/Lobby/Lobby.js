import React, {Component} from 'react';
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
		};
	}

	onReset = () => {
		this.setState({
			wasClickedLeft: false,
			wasClickedRight: false
		})
	}

	onClickLeft = () =>{
		this.setState({wasClickedLeft: !this.state.wasClickedLeft}, function() {
			if (this.state.wasClickedRight === true && this.state.wasClickedLeft === true) {
				this.setState({wasClickedRight: false});
			};
		});
		
	}

	onClickRight = () => {
		this.setState({wasClickedRight: !this.state.wasClickedRight}, function(){
			if (this.state.wasClickedRight === true && this.state.wasClickedLeft === true) {
				this.setState({wasClickedLeft: false});
			};
		});
	}

	render () {
		let lobbyContent = null;
		 
		if (this.state.wasClickedLeft === false && this.state.wasClickedRight === false) {
			lobbyContent = (
				<div className='Lobby'>
					<Sign type='create' onChange={this.onClickLeft}></Sign>
					<Sign type='join' onChange={this.onClickRight}></Sign>
				</div>
			);
		} else if (this.state.wasClickedLeft === false && this.state.wasClickedRight === true) {
			lobbyContent = (
				<div className='Lobby'>
					<SignCollapsed type='create' onChange={this.onClickLeft}></SignCollapsed>
					<SignExpanded type='join' gameList={this.props.gameList} joinGame={this.props.joinGame}></SignExpanded>
				</div>
			);
		} else if (this.state.wasClickedLeft === true && this.state.wasClickedRight === false) {
			lobbyContent = (
				<div className='Lobby'>
					<SignExpanded type='create' createGame={this.props.createGame}></SignExpanded>
					<SignCollapsed type='join' onChange={this.onClickRight}></SignCollapsed>
				</div>
			);
		}
		
		return (
			<div id='lobby-content'>
				{lobbyContent}
			</div>
		);
	}

}

Lobby.propTypes = {
	onSubmit: PropTypes.func
};

export default Lobby;