const { extendSchemaImpl } = require("graphql/utilities/extendSchema");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
