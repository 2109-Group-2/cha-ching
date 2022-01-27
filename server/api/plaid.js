require('dotenv').config();
const router = require('express').Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
// const plaid =require('plaid');
const moment = require('moment');
router.use(cors());
router.use(bodyParser.json());
const User = require('../db/models/User');

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || 	'transactions').split(',');
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(
	','
);
const PLAID_ANDROID_PACKAGE_NAME = process.env.PLAID_ANDROID_PACKAGE_NAME || '';
let ACCESS_TOKEN = null;
let ITEM_ID = null;

const configuration = new Configuration({
	basePath: PlaidEnvironments[PLAID_ENV],
	baseOptions: {
		headers: {
			'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
			'PLAID-SECRET': PLAID_SECRET,
			env: PLAID_ENV,
			'Plaid-Version': '2020-09-14',
		},
	},
});

const client = new PlaidApi(configuration);

router.post('/create_link_token/:id', async (req, res, next) => {
	Promise.resolve()
		.then(async function () {
			const user = await User.findById(req.params.id);
			const clientUserId = user.id;
			const configs = {
				user: {
					// This should correspond to a unique id for the current user.
					client_user_id: String(clientUserId),
				},
				client_name: 'cha-ching',
				products: PLAID_PRODUCTS,
				country_codes: PLAID_COUNTRY_CODES,
				language: 'en',
			};

			if (PLAID_ANDROID_PACKAGE_NAME !== '') {
				configs.android_package_name = PLAID_ANDROID_PACKAGE_NAME;
			}
			const createTokenResponse = await client.linkTokenCreate(configs);
			return res.json({ link_token: createTokenResponse.data });
		})
		.catch(next);
});

router.post('/set_item', async (request, response, next) => {
	try {
		const token = request.body.token;
		const tokenResponse = await client.itemPublicTokenExchange({
			public_token: token
		});

		ACCESS_TOKEN = tokenResponse.data.access_token;
		ITEM_ID = tokenResponse.data.item_id;
		response.json({
			access_token: ACCESS_TOKEN,
			item_id: ITEM_ID,
			error: null,
		});
	} catch(error) {
		next(error);
	}
})

router.get('/budgets/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		console.log('<---THIS IS USER--->', user, '<---THIS IS USER--->')
		res.send(user.budgets)
	} catch(error) {
		console.log('GET Budgets route error')
	}
})

router.post('/budgets/add/:id', async (req, res) => {
	try {
		// console.log('<---IN THE ROUTE AND HERES THE ID: ', req.body.userId)
		const user = await User.findById(req.params.id);
		const newBudget = req.body
		console.log('<---NEW BUDGET--->', newBudget)
		user.budgets.push(newBudget);
		user.save(function (err) {
			if (!err) console.log('Successfully added account!');
		});
		res.json(newBudget);
	} catch(error) {
		console.log('POST Budgets route error')
	}
})

router.post('/accounts/add/:id', async (req, res) => {
	try {
		const userId = req.params.id
		const user = await User.findById(userId);
		const institution = req.body.metadata.institution;
		const { name, institution_id } = institution;
		console.log('<---in the route--->')
    let accountsToAdd = await req.body.metadata.accounts.filter((account) => {
				return (
					account.subtype === 'checking' ||
					account.subtype === 'savings' ||
					account.subtype === 'credit card'
				);
			});
			// Check if account already exists for that specific user using the userId and institutionId
				// const account = await User.find({
				// 	_id: userId,
				// 	'accounts.institutionId': institution_id,
				// });
				const newAccounts = accountsToAdd.map((account) => {
					return {
						userId: userId,
						accessToken: ACCESS_TOKEN,
						itemId: ITEM_ID,
						institutionId: institution_id,
						institutionName: name,
						accountName: account.name,
						accountType: account.type,
						accountSubtype: account.subtype,
					};
				});
				console.log('+++++ newAccounts =====', newAccounts);
				await newAccounts.map((account) => user.accounts.push(account));
				user.save(function (err) {
					if (!err) console.log('Successfully added account!');
				});
				return res.json(newAccounts);
	} catch(error) {
		console.log('<---/accounts/add POST route ERROR--->')
	}
})


router.delete('/accounts/:id', async (req, res) => {
	console.log('=== THIS IS THE REQ.body ===', req.body);
	const user = await User.findById(req.params.id);
	await user.accounts.id(req.body[0]._id).remove();
	await user.save(function (err) {
		if (!err) return console.log('the subdocs were removed');
	});
	res.json({ success: true });
});

router.get('/accounts/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		let accounts = [];
		user.accounts.map((account) => {
			accounts.push(account);
		});
		return res.json(accounts);
	} catch (err) {
		console.log(err);
	}
});

router.post('/transactions', async (req, res) => {
	const now = moment();
	const today = now.format('YYYY-MM-DD');
	console.log('<---HERE IT IS--->', req.body)

	let transactions = [];
	const accounts = req.body;

	if (accounts) {
		accounts.forEach(async function (account) {
			const institutionName = account.institutionName;
			const accountName = account.accountName;
			const configs = {
				access_token: String(account.accessToken),
				start_date: '1969-01-01',
				end_date: today,
				options: {
					count: 500,
					offset: 0,
				},
			};
			const transactionsResponse = await client.transactionsGet(configs);
			transactions.push({
				accountName: institutionName + " - " + accountName,
				transactions: transactionsResponse.data.transactions,
			});
			if (transactions.length === accounts.length) {
				res.json(transactions);
			}
		});
	}
});

router.get('/transactions', (req, res) => {
	res.send('hello world');
});

module.exports = router;
