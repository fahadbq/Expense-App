const Budget = require("../models/budget");

const budgetCtlr = {};

budgetCtlr.create = (req, res) => {
  const body = req.body;

  Budget.find({ userId: req.user?._id })
    .then((budget) => {
      //Budget Already found
      if (budget.length > 0) {
        try {
          throw new Error("Budget Found.");
        } catch (e) {
          res.status(500).json(e.message); // Budget Found
        }
      } else {
        const budget = new Budget(body);

        budget
          .save()
          .then((budget) => {
            res.json(budget);
          })
          .catch((e) => res.json(e.message));
      }

      res.json(budget);
    })
    .catch((err) => {
      return err;
    });
};

budgetCtlr.view = (req, res) => {
  const id = req.params.id;

  Budget.find({ userId: req.user?._id })
    .then((budget) => {
      res.json(budget);
    })
    .catch((err) => res.json(err.message));
};

budgetCtlr.update = (req, res) => {
  const body = req.body;
  const id = req.params.id;

  Budget.findOneAndUpdate({ userId: req.user._id, _id: id }, body, {
    new: true,
    runValidators: true,
  })
    .then((budget) => {
      res.json(budget);
    })
    .catch((err) => res.json(err));
};

budgetCtlr.delete = (req, res) => {
  const id = req.params.id;

  Budget.findOneAndDelete({ userId: req.user._id, _id: id })
    .then((budget) => {
      res.json(budget);
    })
    .catch((err) => res.json(err));
};

module.exports = budgetCtlr;
