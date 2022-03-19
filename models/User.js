const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  pfp: {
    type: String,
    default: "https://res.cloudinary.com/disle0uxb/image/upload/v1647259610/user_nlokii.jpg",
  },
  bio: {
    type: String,
    default: "",
  },
  admin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
