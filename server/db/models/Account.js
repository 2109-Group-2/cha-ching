const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  accessToken: {
    type: String,
    required: true
  },
  itemId: {
    type: String,
    required: true
  },
  institutionId: {
    type: String,
    required: true
  },
  institutionName: {
    type: String
  },
  accountName: {
    type: String
  },
  accountType: {
    type: String
  },
  accountSubtype: {
    type: String
  }
})

let Account = mongoose.model('account', AccountSchema)

module.exports = Account