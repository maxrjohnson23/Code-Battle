import React from 'react';
import PropTypes from 'prop-types';
import '../Lobby.css';
import {MdArrowForward} from 'react-icons/lib/md';

const SubmitButton = (props) => {


	return (
		<div className={'submitButton'}>
			<button 
			className={props.type==='create' ? 'gray' : 'slateblue'}
			name="create-game"
			onClick={props.createGame}
			type=''>Start Game</button>
		</div>
	);
};

SubmitButton.PropTypes = {
	type: PropTypes.String
};

export default SubmitButton;