import React, {Component} from "react";
import Wrapper from "../../hoc/Wrapper/Wrapper";

class CreateQuestion extends Component {
  state = {
    questionText: "",
    code: "",
    tests: [""]
  };


  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const {name, value} = event.target;
    // Code for input during the demo
    if(name === "questionText" && value === "DEMO") {
      this.setState({
        questionText: "Create a function called reverse() that takes a string as an input and returns a reversed string.",
        code: "reverse(str)",
        tests: ["reverse('bop bop') === 'pob pob';", "reverse('Code Battle rules!') === '!selur elttaB edoC';","reverse('tacocat') === 'tacocat';"]
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  handleTestChange = (event, index) => {
    let updatedTests = [...this.state.tests];
    updatedTests[index] = event.target.value;
    this.setState({tests: updatedTests});
  };

  createCustomGame = () => {
    if (this.state.questionText && this.state.code) {
      let objectTests = [...this.state.tests];
      let mappedTests = objectTests.map(test => {
        return {
          testCode: test
        };
      });
      let customGame = {
        questionText: this.state.questionText,
        code: `function ${this.state.code} {\n\n}`,
        tests: mappedTests
      };
      this.props.createGame(customGame);
    }
  };

  addTest = () => {
    let updatedTests = this.state.tests.concat("");
    this.setState({tests: updatedTests});
  };

  render() {

    let testRender = this.state.tests.map((test, index) => <input
        onChange={(event) => this.handleTestChange(event, index)}
        key={index}
        name={`test-${index}`}
        className='create-question-test'
        placeholder="reverse('abc') === 'cba'"
        value={test}
    />);
    return (
        <Wrapper id='create-question-form'>
          <label htmlFor="questionText">Challenge</label>
          <textarea
              value={this.state.questionText}
              onChange={this.handleInputChange}
              name="questionText"
              id='question-text'
              placeholder="Create a function that..."
          />
          <label htmlFor="code">Method Signature</label>
          <input
              value={this.state.code}
              onChange={this.handleInputChange}
              name="code"
              id='code-text'
              placeholder="myFunction(param1, [param2..])"
          />
          <label htmlFor="test-0">Tests</label>
          {testRender}
          <div className='button-section-child' id='button-section-two'>
            <button
                className='gray'
                name="custom-question"
                onClick={this.addTest}
                type='button'>Add Test
            </button>
            <button
                className='gray'
                name="custom-question"
                onClick={this.createCustomGame}
                disabled={this.state.questionText === "" || this.state.code === "" || this.state.tests[0] === ""}
                type='button'>Create Game
            </button>
          </div>
        </Wrapper>

    );
  }
}

export default CreateQuestion;