import React, {Component} from "react";
import axios from "axios";
import API from "../../utils/API";
import { Input, TextArea, FormBtn } from "../../components/Form";

class CreateQuestion extends Component {
    constructor() {
        super();
        this.state = {
            questionCount: 1,
            questionText: "",
            code: "",
            tests: []
        }
    }

    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
            this.setState({
            [name]: value
            });
    };

    handleTestChange = (event, index) => {
        console.log(index);
        let updatedTests = [...this.state.tests];
        updatedTests[index] = event.target.value;
        this.setState({ tests: updatedTests });
    };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.questionText && this.state.code) {
            const testCriteria = [];
            testCriteria.push(this.state.testOne, this.state.testTwo, this.state.testThree);
            let objectTests = [...this.state.tests];
            let mappedTests = objectTests.map(test => {
                return {
                    testCode: test
                }
            })
            console.log(mappedTests)
            API.saveQuestion({
            questionText: this.state.questionText,
            code: this.state.code,
            tests: mappedTests
            }).catch(err => console.log(err));
        }
    };

    handleTestCountIncrease = event => {
        event.preventDefault();
        let questionCountUpdate = this.state.questionCount + 1;
        this.setState({questionCount: questionCountUpdate})
    };

    render() {

        let testRender = [...Array(this.state.questionCount)].map((e, i) => <TextArea
        onChange={(event) => this.handleTestChange(event, i)}
        name={`test-${i}`}
        rows='5'
        className='test-area'
        placeholder="Test One (required)"
        />)
        return (
            <form id='create-question-form'>
                <Input
                    value={this.state.questionText}
                    onChange={this.handleInputChange}
                    name="questionText"
                    id='question-text'
                    placeholder="Question Text (required)"
                />
                <Input
                    value={this.state.code}
                    onChange={this.handleInputChange}
                    name="code"
                    id='code-text'
                    placeholder="Code (required)"
                />
                    {testRender}
                <div className='button-section-child' id='button-section-two'>
                <FormBtn
                    id='add-test' 
                    onClick={this.handleTestCountIncrease}
                    style={{ float: "right", marginBottom: 20 }}
                >
                Add test
                </FormBtn>
                <FormBtn
                    disabled={!(this.state.questionText && this.state.code)}
                    onClick={this.handleFormSubmit}
                    className='gray'
                    // style={{ float: "right", marginBottom: 10 }}
                >
                Submit Question
                </FormBtn>
                </div>
            </form>

        )
    }
};

export default CreateQuestion;