const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApprovalAdvertisementSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  user: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  globalid: {
    type: String,
    default: "advertisement",
  },
  price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "ApprovalAdvertisement",
  ApprovalAdvertisementSchema
);
