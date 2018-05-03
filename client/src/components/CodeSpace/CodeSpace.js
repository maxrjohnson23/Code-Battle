import React, {Component} from "react";
import sandBoxEval from "../../Util/SandboxEval";
import Editor from "../Editor/Editor";
import CodeTests from "../CodeTests/CodeTests";
import Output from "../Output/Output";

class CodeSpace extends Component {
  state = {
    currentQuestion: null,
    output: ""
  };

  componentWillMount() {
    this.setState({
      currentQuestion: this.props.questionDetails
    });
  }

  onChange = (newValue) => {
    let newCode = {...this.state.currentQuestion};
    newCode.code = newValue;
    this.setState({
      currentQuestion: newCode
    });
  };

  keySubmit = (event) => {
    if ((event.keyCode === 10 || event.keyCode === 13) && event.ctrlKey) {
      console.log("Submit!");
      this.submitCode();
    }
  };

  submitCode = () => {
    let userCode = this.state.currentQuestion.code;
    let codePromises = [];

    // Check user code against each test, create list of promises for evaluation
    this.state.currentQuestion.tests.forEach((t, testIndex) => {
      let executableCode = `${userCode} ${t.testCode}`;
      codePromises.push(sandBoxEval(executableCode, testIndex));
    });

    // Evaluate aggregated test results
    Promise.all(codePromises).then((testResults) => {
          let evaluatedQuestion = {...this.state.currentQuestion};

          let allPassed = true;
          testResults.forEach(res => {
            evaluatedQuestion.tests[res.index].result = res.data;
            if (!res.data) {
              allPassed = false;
            }
          });

          // Notify users of win
          if (allPassed) {
            this.props.publishWin(userCode);
          }

          this.setState({
            currentQuestion: evaluatedQuestion,
            output: allPassed ? "All tests passed!" : "There are test errors, keep trying!"
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
    return this.state.currentQuestion ? (
        <div>
          <div className="output">
            <Output message={this.state.output}/>
          </div>
          <div className="hcontainer">
            <div className="code-tests">
              <CodeTests tests={this.state.currentQuestion.tests}/>
            </div>
            <div className="editor">
              <Editor code={this.state.currentQuestion.code}
                      change={this.onChange}
                      submit={this.submitCode}
                      keySubmit={this.keySubmit}/>
            </div>
          </div>
        </div>
    ) : (<div/>);
  }
}

export default CodeSpace;