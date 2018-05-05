import React from "react";

export const FormBtn = props => (
  <button {...props} className="gray">
    {props.children}
  </button>
);