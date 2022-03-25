const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/app", require("./routes/blog"));
app.use("/api/app", require("./routes/material"));
app.use("/api/app", require("./routes/ads"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening to MongoDB")
});