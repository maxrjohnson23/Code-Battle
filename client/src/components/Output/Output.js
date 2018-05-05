import React from "react";
import "./Output.css";

const Output = (props) => {
  let messageClass = props.message.match(/error/i) ? "error" : "success";

  return (
      <div className="outputArea">
        <p className="arrow">></p>
        <p className={messageClass}> {props.message}</p>
      </div>
  );
};

export default Output;