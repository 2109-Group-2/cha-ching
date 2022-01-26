const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BudgetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    unique: 1
  }
})

const Budget = BudgetSchema
module.exports = Budget
