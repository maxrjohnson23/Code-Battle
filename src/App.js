import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import sandBoxEval from './Util/SandboxEval';
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
    })
  };

  onClickHandler = () => {
    let userCode = this.state.currentQuestion.code;
    let codePromises = [];

    this.state.currentQuestion.tests.forEach((t, index) => {
      let runCode = userCode + " " + t.text;
      console.log(runCode);
      codePromises.push(sandBoxEval(runCode, index));
    });

    Promise.all(codePromises).then((results) => {
          let copyQuestion = {...this.state.currentQuestion};

          results.forEach(res => {
            copyQuestion.tests[res.index].result = res.data;
          });
          debugger;
          this.setState({
            currentQuestion: copyQuestion
          })
        }
    ).catch((err) => {
      console.log('Error in all' + err.message);
      this.setState({
        output: err.message
      });
    })

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
          <button style={{clear: 'both'}} onClick={this.onClickHandler}>Submit
          </button>
        </div>
    );
  }
}

export default App;
