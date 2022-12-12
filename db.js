require('dotenv').config()
const mongoose = require("mongoose");
const mongoURI = process.env.REACT_APP_MONGO_STRING

const connectToMongo = async () => {
  mongoose.connect(mongoURI, () => {
    
  });
};

module.exports = connectToMongo;
