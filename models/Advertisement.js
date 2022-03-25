const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdvertisementSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true
  },
  contact: {
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
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("advertisement", AdvertisementSchema);
