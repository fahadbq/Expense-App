const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const configureDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/expense-app")
    .then(() => {
      console.log("connected to Db");
    })
    .catch((err) => console.log("error connecting to database", err));
};

module.exports = configureDB;
