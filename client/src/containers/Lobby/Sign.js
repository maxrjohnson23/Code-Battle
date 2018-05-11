import React from 'react';
import PropTypes from 'prop-types';
import '../Lobby.css';
import { MdSettingsEthernet, MdAddCircle } from 'react-icons/lib/md';

const Sign = props => {
	let icon = null;

	if (props.type === 'create') {
		icon = <MdAddCircle className="icons" />;
	} else {
		icon = <MdSettingsEthernet className="icons" />;
	}

	return (
		<div onClick={props.onChange} className={props.type === 'create' ? 'create' : 'join'}>
			<div className="center">
				{icon}
				<p>{props.type === 'create' ? 'CREATE GAME' : 'JOIN GAME'}</p>
			</div>
		</div>
	);
};

Sign.propTypes = {
	type: PropTypes.string,
	onChange: PropTypes.func,
};

export default Sign;
