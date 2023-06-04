const Expense = require("../models/expense");
const Category = require("../models/category");

const expenseCtlr = {};

expenseCtlr.list = (req, res) => {
  const userId = req.user?._id;

  Expense.find({ userId, deleted: false })
    .then((expenses) => {
      res.json({ data: expenses });
    })
    .catch((err) => res.json(err.message));
};

expenseCtlr.create = (req, res) => {
  const body = req.body;

  const expense = new Expense(body);

  Category.findOne({ _id: body.categoryId }).then((category) => {
    if (category) {
      expense
        .save()
        .then((expense) => {
          res.json(expense);
        })
        .catch((e) => res.json(e.message));
    } else {
      res.json({ error: "Category Not Found" });
    }
  });
};

expenseCtlr.view = (req, res) => {
  const id = req.params.id;

  Expense.findOne({ userId: req.user._id, _id: id })
    .then((expense) => {
      res.json(expense);
    })
    .catch((e) => res.json(e.message));
};

expenseCtlr.update = (req, res) => {
  const body = req.body;
  const id = req.params.id;

  const userId = req.user._id;

  Expense.findOneAndUpdate({ userId, _id: id }, body, {
    new: true,
    runValidators: true,
  })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => res.json(err));
};

expenseCtlr.delete = (req, res) => {
  const id = req.params.id;

  const userId = req.user._id;

  Expense.delete({ userId, _id: id })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => res.json(err));
};

expenseCtlr.listDeleted = (req, res) => {
  Expense.findDeleted({ userId: req.user?._id })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => res.json(err.message));
};

expenseCtlr.undoDeleted = (req, res) => {
  // const body = req.body;
  const id = req.params.id;

  const userId = req.user._id;

  Expense.restore({ userId, _id: id })
    .then((expense) => {
      res.json(expense);
    })
    .catch((err) => res.json(err));
};

module.exports = expenseCtlr;
