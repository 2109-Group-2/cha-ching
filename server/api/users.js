const router = require('express').Router();
const { User, Account, Saving, Subscription } = require('../db');

module.exports = router;

router.get('/:userId', async (req, res, next) => {
	try {
		const id = req.params.userId;
		const singleUserWithAccounts = await User.findByPk(id, {
			include: [
				{
					model: Account,
					as: 'accounts',
				},
				{
					model: Saving,
					as: 'savings',
				},
				{
					model: Subscription,
					as: 'subscriptions',
				},
			],
		});
		if (!singleUserWithAccounts) {
			res.sendStatus(404);
			return;
		}
		res.send(singleUserWithAccounts);
	} catch (error) {
		next(error);
	}
});

router.post('/subscriptions/:id', async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findById(userId);
		const newSubscription = {
			userId: userId,
			accountName: req.body.accountName,
			name: req.body.name,
			startDate: req.body.startDate,
			price: req.body.price,
      frequency: req.body.frequency
		};
		console.log('+++++ newSubscription =====', newSubscription);
		await user.subscriptions.push(newSubscription);
		user.save(function (err) {
			if (!err) console.log('Successfully added subscription!');
		});
		return res.json(newSubscription);
	} catch (error) {
		console.log('<---/subscriptions/add POST route error--->', error);
	}
});

router.delete('/subscriptions/:id', async (req, res) => {
	console.log('=== THIS IS THE REQ.body ===', req.body);
	const user = await User.findById(req.params.id);
	await user.subscriptions.id(req.body[0]._id).remove();
	await user.save(function (err) {
		if (!err) return console.log('the subdocs were removed');
	});
	res.json({ success: true });
});

router.get('/subscriptions/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		let subscriptions = [];
		user.subscriptions.map((account) => {
			subscriptions.push(account);
		});
		return res.json(subscriptions);
	} catch (err) {
		console.log(err);
	}
});
