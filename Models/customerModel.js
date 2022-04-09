const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    balance: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
