const bcryptjs = require("bcryptjs");

//Not used
const encryptPassword = (req, res, next) => {
  //Generating Random Salt Value
  bcryptjs.genSalt().then((salt) => {
    //Encrypting the value with user's password and salt using hash method
    bcryptjs.hash(req.body.password, salt).then((encrypted) => {
      req.body.password = encrypted;
      req.body.profile = { ...req.body.profile, name: req.body.username };
      next();
    });
  });
};

module.exports = encryptPassword;
