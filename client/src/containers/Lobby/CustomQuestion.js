import React from "react";
import "../Lobby.css";

const CustomQuestion = (props) => {


	return (
		<div className={'custom-question'}>
			<button 
			className='gray'
			name="custom-question"
			onClick={props.onClick}
			type='button'
			disabled={props.disabled}>Create your own Question</button>
		</div>
	);
};

export default CustomQuestion;