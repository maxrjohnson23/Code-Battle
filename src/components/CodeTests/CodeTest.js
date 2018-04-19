import React from "react";

let testsStyle = {
  float: "left",
  "text-align": "left"
};

const Tests = (props) => (
  <div style={testsStyle}>
    {
      props.tests.map(t => (
        <div key={t.id}>
          <p>Test:  {t.text}</p>
          <p>Result:  {t.result ? "Pass" : "Fail"}</p>
        </div>
      ))
    }
  </div>
);

export default Tests;