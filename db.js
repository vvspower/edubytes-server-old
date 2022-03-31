require('dotenv').config()
const mongoose = require("mongoose");
const mongoURI = process.env.REACT_APP_MONGO_STRING
// "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

//  mongodb+srv://vvspower:lenovo123@notebookbeta.muuq6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const connectToMongo = async () => {
  mongoose.connect(mongoURI, () => {
    
  });
};

module.exports = connectToMongo;
