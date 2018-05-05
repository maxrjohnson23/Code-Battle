import React from 'react';
import PropTypes from 'prop-types';
import '../Lobby.css';

const Checkbox = (props) => {

    return (
        <div>
            <label>{props.label}</label>
            <input 
            id={props.name}
            type="checkbox"
            onClick={props.change}
            />
        </div>
    );
};

Checkbox.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string
};

export default Checkbox;