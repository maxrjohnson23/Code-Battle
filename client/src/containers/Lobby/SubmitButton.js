import React from 'react';
import PropTypes from 'prop-types';
import '../Lobby.css';
import {MdArrowForward} from 'react-icons/lib/md';
import {Motion, spring} from 'react-motion';

const SubmitButton = (props) => {

	return (
		<div className={'submitButton'}>
			<button className='slateblue'><MdArrowForward/></button>
		</div>
	);
} 

SubmitButton.PropTypes = {
	type: PropTypes.String
};

export default SubmitButton;