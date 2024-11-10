const { extendSchemaImpl } = require("graphql/utilities/extendSchema");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
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
  date:{
    type: Date,
    default: Date.now,
    
  }
});

module.exports = mongoose.model("Post", postSchema);
