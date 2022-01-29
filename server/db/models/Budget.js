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
    required: true,
    unique: 1
  },
  startDate: {
    type: Date,
    required: true,
    get: formatDate
  },
  endDate: {
    type: Date,
    required: true,
    get: formatDate
  }
})

function formatDate(date) {
  return date.toISOString().split('T')[0];
}


BudgetSchema.statics.doStuff = async function ({category, amount}) {
  const budget = await this.find({category: category, amount: amount});

  return budget;

  // const budget = await this.model('Budget').find({})
  // const budget = await this.where('name', new RegExp(name, 'i')).exec(cb)
};


BudgetSchema.pre('validate', async function(next) {
  const info = {category: this.category, amount: this.amount};
  /*
  const testVar = BudgetSchema.doStuff(info)
  if(testVar.amount) {
    const err = new Error('something went wrong');
    next(err)
  }
  */

});


// const Budget = mongoose.model("budgets", BudgetSchema);
const Budget = BudgetSchema;
module.exports = Budget
