const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  accountName: {
    type: String,
  },
  name: {
    type: String,
  },
  startDate: {
    type: String
  },
  frequency: {
    type: String,
    enum: [
      "Monthly",
      "Weekly",
      "Bi-Weekly",
      "Yearly",
      "Daily",
      "Quaterly",
    ],
    default: "Monthly",
  },
  price: {
    type: Number
  }
})
const Subscription = SubscriptionSchema
module.exports = Subscription
