import React from 'react';
import PropTypes from 'prop-types';
import '../Lobby.css';
import { MdSettingsEthernet, MdAddCircle } from 'react-icons/lib/md';

const SignCollapsed = props => {
	let icon = null;

	if (props.type === 'create') {
		icon = <MdAddCircle className="iconsCollapsed" />;
	} else {
		icon = <MdSettingsEthernet className="iconsCollapsed" />;
	}

	return (
		<div onClick={props.onChange} className={props.type === 'create' ? 'createCollapsed' : 'joinCollapsed'}>
			{icon}
		</div>
	);
};

SignCollapsed.propTypes = {
	type: PropTypes.string,
	onChange: PropTypes.func,
};

export default SignCollapsed;
