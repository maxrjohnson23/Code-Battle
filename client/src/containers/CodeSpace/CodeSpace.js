import React, {Component} from "react";
import sandBoxEval from "../../Util/SandboxEval";
import questions from "../../questions"

import Editor from "../../components/Editor/Editor";
import CodeTests from "../../components/CodeTests/CodeTests";
import Output from "../../components/Output/Output";

class CodeSpace extends Component {
  state = {
    questions: questions,
    currentQuestion: questions[0],
    output: ""
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

          let allPassed = true;
          testResults.forEach(res => {
            evaluatedQuestion.tests[res.index].result = res.data;
            if(!res.data) {
              allPassed = false;
            }
          });


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
    return (
        <div>
          <Output message={this.state.output} />
          <CodeTests tests={this.state.currentQuestion.tests}/>
          <Editor code={this.state.currentQuestion.code}
                  change={this.onChange}
                  submit={this.submitCode}/>
        </div>
  )
  }
}

export default CodeSpace;