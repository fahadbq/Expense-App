const Category = require("../models/category");

const checkCategory = (req, res, next) => {
  const id = req.params.id;

  Category.findOne({ userId: req.user._id, _id: id }).then((category) => {
    if (category && category.name === "Uncategorised") {
      res.json({ error: "Cannot Update/Delete the Default Category" });
    } else {
      next();
    }
  });
};

module.exports = checkCategory;
