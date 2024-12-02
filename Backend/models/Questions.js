const { extendSchemaImpl } = require("graphql/utilities/extendSchema");
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
