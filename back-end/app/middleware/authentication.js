const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  try {
    const decodeToken = jwt.verify(token, "expense-app");
    User.findById(decodeToken._id)
      .then((user) => {
        console.log("user in middleWare authentication", user);
        const data = {
          _id: user._id,
          email: user.email,
          profile: user?.profile,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          __v: 0,
        };

        req.user = data;

        next();
      })
      .catch((err) => res.json(err));
  } catch (e) {
    res.json(e.message);
  }
};

const authorizeUser = (req, res, next) => {};

module.exports = {
  authenticateUser,
  authorizeUser,
};
