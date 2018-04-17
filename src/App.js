import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
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

  sandBoxEval = (strCode, cb, blnExecOnly) => {
    function work() { // this code runs in the worker, providing a safe one-time custom JS enviroment
      delete Function.prototype.constructor; 	// blocks Function access via any.constructor
      delete Object.getOwnPropertyNames; 	// prevents environment sniffing

      // black-list (potentially) unsafe globals to prevent access from user-provided code via formal parameters on a wrapper function:
      function privacy(self, XMLHttpRequest, importScripts, Function, Worker, WebSocket, MessageChannel, __proto__, __defineGetter__,
                       IDBDatabase, setTimeout, setInterval, EventSource, onmessage, onerror, console) {
        "use strict"; // makes "eval" keyword even safer by keeping this from execution aliases

        postMessage(/0/);

      }

      /* end privacy() */

      setTimeout(privacy.bind(null), 0); // block 'this' in user-provided code and execute

    }
    /* end work() */

    if (typeof strCode === "function") {
      strCode = " (" + strCode + ").call()";
    } else {
      if (blnExecOnly) {
        strCode = "true);" + strCode + ";void(0";
      } else {
        strCode = "eval(" + JSON.stringify(strCode.trim()) + ")";
      }
    }

    var code = String(work).trim().split("{").slice(1).join("{").slice(0, -1).trim().replace("/0/", strCode), // inline the user code
      worker = new Worker(URL.createObjectURL(new Blob([code]))); // create a new worker loaded with the user-provided code in the wrapper

    worker.onmessage = function (e) { // code evaluated, results arriving
      cb(e.data, e, code, worker); // invoke callback with result and some extra arguments for routing
      worker.terminate();
    };

    worker.onerror = function (e) { // code evaluated, results arriving
      var m = e.message;
      e = {
        toString: function () {
          return m + "\n" + Object.keys(e.e).map(function (a) {
            if (this[a] == null || typeof this[a] === "object") return;
            return a + ": \t" + this[a]
          }, e.e).filter(Boolean).join("\n");
        }, e: e
      };
      cb(e, null, code, worker); // invoke callback with result, null as the event object to indicate errror, and some extra arguments for routing
      worker.terminate();
    };

    return worker;
  };

  onChange = (newValue) => {
    console.log(newValue);
    this.setState({
      code: newValue
    })
  };

  onClickHandler = () => {
    let userCode = this.state.code;
    this.state.currentQuestion.tests.forEach((t, index) => {
      let runCode = userCode + " " + t.text;
      console.log(runCode);
      this.sandBoxEval(runCode, (result) => {
          console.log(result);
        if (result.e && result.e.message) {
            this.setState({
              output: result.e.message
            })
          } else {
            let passed = (result) ? "Passed" : "Failed";
            let copyQuestion = {...this.state.currentQuestion};
            if(passed) {
              copyQuestion.tests[index].result = !copyQuestion;
            }
            this.setState({
              currentQuestion: copyQuestion
            })
          }
        }
      );
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
        <Editor defaultCode={this.state.currentQuestion.defaultCode} change={this.onChange}/>
        <button style={{clear: 'both'}} onClick={this.onClickHandler}>Submit</button>
      </div>
    );
  }
}

export default App;
