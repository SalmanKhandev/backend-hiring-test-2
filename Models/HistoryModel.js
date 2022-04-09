const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customerModelSchema = new mongoose.Schema(
  {
    senderAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    receiverAccountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const customerModel = mongoose.model("History", customerModelSchema);

module.exports = customerModel;
