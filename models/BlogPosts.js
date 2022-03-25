const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogPostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: ""
  },
  tag: {
    type: String,
    required: true,
  },
  user: {
    type: String,
  },
  username: {
    type: String,
   
  },
  pfp: {
    type: String,
  },
  likes: {
    type: Object,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now,
  },
  globalid: {
    type: String,
    default: "blogposts",
  },
});

module.exports = mongoose.model("blogpost", BlogPostSchema);
