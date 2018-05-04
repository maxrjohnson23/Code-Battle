const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passedSchema = new Schema({
  user: { type: String, required: true },
  time: { type: Date, required: true }
});

const Passed = mongoose.model("Passed", passedSchema);

module.exports = Passed;