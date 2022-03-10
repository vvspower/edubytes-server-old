const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApprovalBlogPostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
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

module.exports = mongoose.model("approvalBlogpost", ApprovalBlogPostSchema);
