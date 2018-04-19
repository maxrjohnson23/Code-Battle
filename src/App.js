import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import sandBoxEval from "./Util/SandboxEval";
import questions from "./questions";

import Editor from "./Editor";
import Tests from "./Tests";

class App extends Component {

  state = {
    questions: questions,
    currentQuestion: questions[0],
    output: "output here",
    testOutcome: "Failed"
  };


  onChange = (newValue) => {
    let newCode = {...this.state.currentQuestion};
    newCode.code = newValue;
    this.setState({
      currentQuestion: newCode
    });
  };

  submitCode = () => {
    let userCode = this.state.currentQuestion.code;
    let codePromises = [];

    // Check user code against each test, create list of promises for evaluation
    this.state.currentQuestion.tests.forEach((t, testIndex) => {
      let executableCode = `${userCode} ${t.text}`;
      codePromises.push(sandBoxEval(executableCode, testIndex));
    });

    // Evaluate aggregated test results
    Promise.all(codePromises).then((testResults) => {
          let evaluatedQuestion = {...this.state.currentQuestion};

          testResults.forEach(res => {
            evaluatedQuestion.tests[res.index].result = res.data;
          });
          this.setState({
            currentQuestion: evaluatedQuestion
          });
        }
    ).catch((err) => {
      const formattedError = `${err.message} at Line:${err.lineno}, Col:${err.colno}`;
      console.log(formattedError);
      this.setState({
        output: formattedError
      });
    });
  };


  render() {
    return (

        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title" id="console">Welcome to React</h1>
          </header>
          <p>{this.state.output}</p>
          <Tests tests={this.state.currentQuestion.tests}/>
          <Editor code={this.state.currentQuestion.code}
                  change={this.onChange}/>
          <button style={{clear: "both"}} onClick={this.submitCode}>Submit
          </button>
        </div>
    );
  }
}

export default App;
