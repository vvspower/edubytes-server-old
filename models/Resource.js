const mongoose = require("mongoose");
const { Schema } = mongoose;

const ResourceSchema = new Schema({
  // name , descripiton , type , user, globalid: resource , subject, date , whatsapp
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  globalid: {
    type: String,
    default: "resource",
  },
  subject: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  link: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("resource", ResourceSchema);
