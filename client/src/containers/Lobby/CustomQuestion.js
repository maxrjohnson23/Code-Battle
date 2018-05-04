import React from 'react';
import PropTypes from 'prop-types';
import '../Lobby.css';
// import {MdArrowForward} from 'react-icons/lib/md';

const CustomQuestion = (props) => {


	return (
		<div className={'custom-question'}>
			<button 
			className='gray'
			name="custom-question"
			onClick={props.CustomQuestion}
			type=''>Create you own Question?</button>
		</div>
	);
};

CustomQuestion.PropTypes = {
	type: PropTypes.String
};

export default CustomQuestion;