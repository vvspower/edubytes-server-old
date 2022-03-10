const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApprovalResourceSchema = new Schema({
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
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("approvalResource", ApprovalResourceSchema);
