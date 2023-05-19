const mongoose = require("mongoose");
const Expense = require("./expense");
const ObjectId = require("mongoose").Types.ObjectId;

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

categorySchema.methods.transferExpenses = function (id) {
  const category = this;

  return Expense.updateMany(
    { categoryId: new ObjectId(id) },
    { categoryId: new ObjectId(category._id) }
  );
};

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
