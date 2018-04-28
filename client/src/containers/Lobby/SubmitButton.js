import React from 'react';
import PropTypes from 'prop-types';
import '../Lobby.css';
import {MdArrowForward} from 'react-icons/lib/md';
import {Motion, spring} from 'react-motion';
import axios from 'axios';

const SubmitButton = (props) => {
	
	// handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	console.log('handleSubmit');

	// 	if (this.prop.type === 'create') {
	// 		// axios 
	// 		//method to create game
	// 	} 
	// 	else {
	// 		//join selected game
	// 	}

	// }

	return (
		<div className={'submitButton'}>
			<button 
			className={props.type==='create' ? 'gray' : 'slateblue'}
			onClick={this.handleSubmit}
			type='submit'><MdArrowForward/></button>
		</div>
	);
} 

SubmitButton.PropTypes = {
	type: PropTypes.String
};

export default SubmitButton;