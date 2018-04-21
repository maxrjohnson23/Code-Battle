const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the questions
const QuestionSchema = new Schema({

  questionText: {
    type: String,
    unique: true,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  tests: [
    {
      testCode: String
    }
  ]
});

// Create a model from the schema
const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
