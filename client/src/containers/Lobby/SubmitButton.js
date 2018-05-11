import React from 'react';
import PropTypes from 'prop-types';
import '../Lobby.css';

const SubmitButton = props => {
	return (
		<div className={'submitButton'}>
			<button
				className={props.type === 'create' ? 'gray' : 'slateblue'}
				name="create-game"
				onClick={props.createGame}
				disabled={props.disabled}
				type=""
			>
				Start Game
			</button>
		</div>
	);
};

SubmitButton.propTypes = {
	type: PropTypes.string,
	createGame: PropTypes.func,
};

export default SubmitButton;
