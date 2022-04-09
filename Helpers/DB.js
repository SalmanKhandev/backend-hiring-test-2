const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/turing", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (e) => {
  console.log(e);
  conole.log("Databse is not connected");
});

db.once("open", () => {
  console.log("Database is connected");
});

module.exports = db;
