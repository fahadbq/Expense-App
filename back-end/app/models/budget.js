const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    // validate: {
    //   validator: function (value) {
    //     return validator.isNumeric(value);
    //   },
    //   message: "Invalid Number",
    // },
  },
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
