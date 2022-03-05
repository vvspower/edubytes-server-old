const mongoose = require("mongoose");
const { Schema } = mongoose;

const RepliesSchema = new Schema({
  // post will be the post id which the reply will be given on
  postid: {
    type: String,
    required: true,
  },
  //   user will be the user giving the reply
  user: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
    required: true,
  },
  likes: {
    type: String,
    default: 0,
  },
  name: {
    type: String,
    required: "true",
  },

  date: {
    type: Date,
    default: Date.now,
  },
  pfp: {
    type: String
  }
});

module.exports = mongoose.model("replies", RepliesSchema);
