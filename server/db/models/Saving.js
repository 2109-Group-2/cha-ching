const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavingSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	title: {
		type: String,
		required: [true, 'must give your goal a title'],
	},
	image: {
		type: String,
		default: 'cha-ching.png',
	},
	category: {
		type: String,
		enum: [
			'Babies and Kids',
			'Bills and Taxes',
			'Electronics',
			'Gifts and Shopping',
			'Wedding',
			'Furniture',
			'Other',
		],
		default: 'Other',
	},
	currentBalance: {
		type: Number,
		default: 0,
	},
	goalTarget: {
		type: Number,
		min: 1,
		required: [true, 'Must choose an amount'],
	},
});

const Saving = SavingSchema;
module.exports = Saving;
