import axios from "axios";

export default {
  // Saves a book to the database
  saveQuestion: function(questionData) {
    return axios.post("/api/question", questionData);
  }
};