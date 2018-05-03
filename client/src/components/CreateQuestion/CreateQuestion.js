import React, {Component} from "react";
import axios from "axios";
import API from "../../utils/API";
import { Input, TextArea, FormBtn } from "../../components/Form";

class CreateQuestion extends Component {
    constructor() {
        super();
        this.state = {
            questionText: "",
            code: "",
            tests: [],
            testOne: "",
            testTwo: "",
            testThree: ""
        }
    }

    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        // if (name === 'test') {
        //     this.setState({ tests: [...this.state.tests, event.target.value]})
        // } else {
            this.setState({
            [name]: value
            });
        // }
    };
    // handleInputChange = event => {
    //     this.setState({ tests: [...this.state.tests, event.target.value] });
    // };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.questionText && this.state.code && this.state.testOne) {
            const testCriteria = [];
            // const testingCode = "testCode";
            // testCriteria.push({'"testCode"': this.state.testOne}, {'"testCode"': this.state.testTwo}, {'"testCode"': this.state.testThree});
            testCriteria.push(this.state.testOne, this.state.testTwo, this.state.testThree);
            // testCriteria.push({one}, {two}, {three});
            API.saveQuestion({
            questionText: this.state.questionText,
            code: this.state.code,
            tests: { testCode: this.state.testOne}
            // tests: this.state.tests

            }).catch(err => console.log(err));
        }
    };
    render() {
        return (
            <form>
                <Input
                    value={this.state.questionText}
                    onChange={this.handleInputChange}
                    name="questionText"
                    placeholder="Question Text (required)"
                />
                <Input
                    value={this.state.code}
                    onChange={this.handleInputChange}
                    name="code"
                    placeholder="Code (required)"
                />
                <TextArea
                    // value={this.state.test}
                    value={this.state.testOne}
                    onChange={this.handleInputChange}
                    // name="test"
                    name="testOne"
                    placeholder="Test One (required)"
                />
                <TextArea
                    // value={this.state.test}
                    value={this.state.testTwo}
                    onChange={this.handleInputChange}
                    // name="test"
                    name="testTwo"
                    placeholder="Test Two (required)"
                />
                <TextArea
                    // value={this.state.test}
                    value={this.state.testThree}
                    onChange={this.handleInputChange}
                    // name="test"
                    name="testThree"
                    placeholder="Test Three (required)"
                />
                <FormBtn
                    disabled={!(this.state.questionText && this.state.code && this.state.testOne)}
                    onClick={this.handleFormSubmit}
                >
                Submit Question
                </FormBtn>
            </form>

        )
    }
};

export default CreateQuestion;