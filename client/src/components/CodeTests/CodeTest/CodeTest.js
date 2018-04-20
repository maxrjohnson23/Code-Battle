import React from "react";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
import faError from '@fortawesome/fontawesome-free-solid/faTimes'

const CodeTest = (props) => {
  let resultIcon = "";
  if(props.result) {
    resultIcon = <FontAwesomeIcon icon={faCheck} color="green" size="lg"/>;
  } else {
    resultIcon = <FontAwesomeIcon icon={faError} color="red" size="lg"/>;
  }

  return (
      <tr>
        <td>{props.text}</td>
        <td className="td-center">{resultIcon}</td>
      </tr>
  );
};

export default CodeTest;