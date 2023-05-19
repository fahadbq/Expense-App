const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const validator = require("validator");

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    message: "Invalid Number",
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    // default: Date.now,
  },
  deleted: { type: Boolean, default: false, select: false },
});

// add the plugin to your schema
expenseSchema.plugin(mongoose_delete, { overrideMethods: true });

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
