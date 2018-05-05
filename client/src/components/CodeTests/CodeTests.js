import React from "react";
import CodeTest from "./CodeTest/CodeTest";
import "./CodeTests.css";


const CodeTests = (props) => (
    <div className="codeTests">
      <table>
        <thead>
        <tr>
          <th>Test</th>
          <th>Result</th>
        </tr>
        </thead>
        <tbody>
        {
          props.tests.map(t => (
              <CodeTest key={t._id} text={t.testCode} result={t.result}/>
          ))
        }
        </tbody>
      </table>
    </div>
);

export default CodeTests;