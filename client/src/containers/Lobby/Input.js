import React from 'react';
import PropTypes from 'prop-types';
import '../Lobby.css';

const Input = props => {
	let iconVisibility = null;

	return (
		<div className="Input">
			<input
				id={props.name}
				name={props.name}
				autoComplete="false"
				required="true"
				type={props.type}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.change}
			/>
			{iconVisibility}
		</div>
	);
};

Input.propTypes = {
	id: PropTypes.string,
	type: PropTypes.string,
	placeholer: PropTypes.string,
};

export default Input;
