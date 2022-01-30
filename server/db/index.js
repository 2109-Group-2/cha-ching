//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Account = require('./models/Account');
const Saving = require('./models/Saving');
const Budget = require('./models/Budget');
;
//associations could go here!
// User.hasMany(Account);
// Account.belongsTo(User);

// export const studentsCollection = db.collection("students");
// export const usersCollection = db.collection("users");

module.exports = {
	db,
	User,
	Account,
	Saving,
	Budget
};
