const User = require("../../app/models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Category = require("../models/category");

const usersCtlr = {};

usersCtlr.register = (req, res) => {
  const body = req.body;

  const user = new User(body);

  user
    .save()
    .then((user) => {
      return Category.create({ name: "Uncategorised", userId: user._id });
    })
    .then(() => {
      const data = {
        _id: user._id,
        email: user.email,
        profile: {
          ...user.profile,
          name: user.username,
        },
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        __v: 0,
      };
      res.json(data);
    })
    .catch((err) => res.json(err));

  // Promise.all([
  //   user.save(),
  //   Category.create({ name: "Uncategorised", userId: user._id }),
  // ]).then((result) => {
  //   const [user] = result;

  // });
};

usersCtlr.login = (req, res) => {
  const body = req.body;

  User.findOne({ email: body.email }).then((user) => {
    bcryptjs.compare(body.password, user.password).then((match) => {
      if (match) {
        const tokenData = {
          _id: user._id,
          email: user.email,
        };

        const token = jwt.sign(tokenData, "expense-app", { expiresIn: "2d" });

        res.json({
          Authorization: `Bearer ${token}`,
        });
      } else {
        try {
          throw new Error("Invalid email or password.");
        } catch (e) {
          res.status(500).json(e.message); // Budget Found
        }
      }
    });
  });
};

usersCtlr.account = (req, res) => {
  res.json(req.user);
};

usersCtlr.updateProfile = (req, res) => {
  const userId = req.user._id;
  const body = { ...req.body, picture: req.file.path };

  User.findOneAndUpdate({ _id: userId }, { profile: body }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: "Server error" });
    });
};

usersCtlr.googleAuthentication = (req, res) => {
  const reqData = req.sessionStore;
  console.log("readableState", reqData);

  const user = reqData.user;

  console.log("success in authentication", user);

  // Assuming you have a secret key for signing the token
  const secretKey = process.env.GOOGLE_CLIENT_SECRET;

  // Extract the necessary information from the user object
  const { id, displayName, email, photos } = user;

  console.log("id", id);
  console.log("displayName", displayName);
  console.log("email", email);
  console.log("photos", photos);
  console.log("user", user.raw);

  // Create the payload for the token
  const payload = {
    userId: id,
    displayName,
    email,
  };

  // Set the options for the token (e.g., expiration time)
  const options = {
    expiresIn: "2d",
  };

  // Generate the token
  const token = jwt.sign(payload, secretKey, options);

  res.json({
    Authorization: `Bearer ${token}`,
  });
};

module.exports = usersCtlr;
