const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      minLenght: 6,
      unique: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Invalid Email Format.",
      },
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      name: {
        type: String,
      },
      phone: {
        type: String,
      },
      occupation: {
        type: String,
      },
      picture: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

//OOPS conect does support callback function with latest mongoose@7.0.0 onwards

// userSchema.methods.encryptedPassword = function () {
//   const user = this;
//   return bcrypt.genSalt().then((salt) => {
//     return bcrypt.hash(user.password, salt).then((encryptedPassword) => {
//       user.password = encryptedPassword;
//       console.log("user", user);
//       return user.save();
//     });
//   });
// };

// userSchema.methods.verifyPassword = function (password) {
//   const user = this;

//   bcrypt.compare(password, user.password).then((match) => {
//     if (match) {
//       // return Promise.resolve(user) was not working
//       return new Promise((resolve, reject) => {
//         resolve(user);
//       });
//     } else {
//       // return Promise.reject({ notice: "Invalid email or password" }); was not working
//       new Promise((resolve, reject) => {
//         reject({ notice: "Invalid email or password" });
//       });
//     }
//   });
// };

// userSchema.methods.generateToken = function () {
//   const user = this;
//   const tokenData = {
//     _id: user._id,
//     email: user.email,
//   };

//   const token = jwt.sign(tokenData, "expense-app", { expiresIn: "2d" });

//   return token;
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
