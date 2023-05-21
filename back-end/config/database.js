const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const configureDB = () => {
  mongoose
    // .connect("mongodb://localhost:27017/expense-app")
    .connect(
      "mongodb+srv://daylight1498:a9kl0C97SbSFfxG6@cluster0.b2dlfga.mongodb.net/"
    )
    .then(() => {
      console.log("connected to Db");
    })
    .catch((err) => console.log("error connecting to database", err));
};

module.exports = configureDB;
