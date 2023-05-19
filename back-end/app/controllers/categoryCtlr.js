const Category = require("../models/category");
const Expense = require("../models/expense");
const ObjectId = require("mongoose").Types.ObjectId;

const categoryCtlr = {};

categoryCtlr.list = (req, res) => {
  Category.find({ userId: req.user?._id })
    .then((categories) => {
      res.json({ data: categories });
    })
    .catch((err) => res.json(err.message));
};

categoryCtlr.create = (req, res) => {
  const body = req.body;

  console.log("req", req);

  const category = new Category(body);

  category
    .save()
    .then((category) => {
      res.json(category);
    })
    .catch((e) => res.json(e.message));
};

categoryCtlr.view = (req, res) => {
  const id = req.params.id;

  Category.findOne({ userId: req.user._id, _id: id })
    .then((category) => {
      res.json(category);
    })
    .catch((e) => res.json(e.message));
};

categoryCtlr.update = (req, res) => {
  const body = req.body;
  const id = req.params.id;

  Category.findOneAndUpdate({ userId: req.user._id, _id: id }, body, {
    new: true,
    runValidators: true,
  })
    .then((category) => {
      res.json(category);
    })
    .catch((err) => res.json(err));
};

categoryCtlr.delete = (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;

  // Category.findOne({ userId, name: "Uncategorised" }).then((category) => {
  //   Expense.updateMany(
  //     { categoryId: new ObjectId(id) },
  //     { categoryId: new ObjectId(category._id) },
  //     (err, response) => {
  //       if (err) {
  //         res.json(err);
  //       } else {
  //         Category.findOneAndDelete({ userId, _id: id })
  //           .then((category) => {
  //             res.json(category);
  //           })
  //           .catch((err) => res.json(err));
  //       }
  //     }
  //   );
  // });

  //Creating Method in Model and returning Promise instead of Call back function

  Category.findOne({ userId, name: "Uncategorised" }).then((category) => {
    //Methods Created
    category
      .transferExpenses(id)
      .then((response) => {
        return Category.findOneAndDelete({ userId, _id: id });
      })
      .then((category) => {
        res.json(category);
      })
      .catch((err) => res.json(err));
  });
};

module.exports = categoryCtlr;
