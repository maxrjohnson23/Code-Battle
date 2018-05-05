import React from "react";
import PropTypes from "prop-types";
import "../Lobby.css";
import {MdArrowForward} from "react-icons/lib/md";

const SubmitButton = (props) => {


	return (
		<div className={'submitButton'}>
			<button 
			className={props.type==='create' ? 'gray' : 'slateblue'}
			name="create-game"
			onClick={props.createGame}
			type=''><MdArrowForward/></button>
		</div>
	);
};

SubmitButton.propTypes = {
  type: PropTypes.string,
  createGame: PropTypes.func
};

export default SubmitButton;