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
  const body = { ...req.body, pictureFile: req?.file?.path };

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

usersCtlr.googleAuthentication = async (req, res) => {
  // Access the authenticated user's information
  const user = req.user._json;

  // Assuming you have a secret key for signing the token
  const secretKey = "expense-app";

  try {
    // Check if the user already exists in the database
    let existingUser = await User.findOne({ email: user.email });

    // If the user doesn't exist, create a new user document
    if (!existingUser) {
      const newUser = new User({
        googleId: req.user.id,
        username: user.name,
        email: user.email,
        password: "GoogleSignIn",
        profile: {
          name: user.name,
          picture: user.picture,
        },
      });

      existingUser = await newUser.save();
    }

    // Create the payload for the token
    const payload = {
      _id: existingUser._id,
      username: existingUser.profile.name,
      email: existingUser.email,
      profile: existingUser.profile,
      googleId: existingUser.googleId,
    };

    // Set the options for the token (e.g., expiration time)
    const options = {
      expiresIn: "2d",
    };

    // Generate the token
    const token = `Bearer ${jwt.sign(payload, secretKey, options)}`;

    // Return the token as an API response

    res.redirect(`${process.env.CLIENT_URL}/auth/success?id=${token}`);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error during Google authentication:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = usersCtlr;
