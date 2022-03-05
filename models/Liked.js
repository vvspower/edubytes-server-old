const mongoose = require("mongoose");
const { Schema } = mongoose;

const LikedSchema = new Schema({
  // post will be the post id which the reply will be given on
  commentid: {
    type: String,
    required: true,
  },

  likedby: {
    type: String,
    required: true,
  },
  pfp: {
    type: String
  }
});

module.exports = mongoose.model("liked", LikedSchema);
