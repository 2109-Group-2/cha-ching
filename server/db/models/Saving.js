const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SavingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: [true, "must give your goal a title"],
  },
  image: {
    type: String,
    default: "https://m.media-amazon.com/images/I/41WPpgz6FYL._AC_SL1200_.jpg",
  },
  category: {
    type: String,
    enum: [
      "Babies and Kids",
      "Bills and Taxes",
      "Electronics",
      "Gifts and Shopping",
      "Wedding",
      "Furniture",
      "Other",
    ],
    default: "Other",
  },
  currentBalance: {
    type: Number,
    default: 0,
  },
  goalTarget: {
    type: Number,
    min: 100,
    max: 100000000,
    required: [true, "Must choose an amount"],
  },
});

const Saving = SavingSchema;
module.exports = Saving;
