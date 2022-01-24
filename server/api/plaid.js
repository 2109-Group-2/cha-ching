require('dotenv').config();
const router = require('express').Router();
const bodyParser = require('body-parser');
const keys = require('../config/keys');
const cors = require('cors');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
// const plaid =require('plaid');
const moment = require('moment');
router.use(cors());
router.use(bodyParser.json());
const mongoose = require('mongoose');

const Account = require('../db/models/Account');
const User = require('../db/models/User');
// const { PlaidApi } = require('plaid');

const PLAID_CLIENT_ID = keys.PLAID_CLIENT_ID;
const PLAID_SECRET = keys.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || 'transactions').split(
	','
);
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(
	','
);
const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || '';
const PLAID_ANDROID_PACKAGE_NAME = process.env.PLAID_ANDROID_PACKAGE_NAME || '';
let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;
let PAYMENT_ID = null;
let TRANSFER_ID = null;

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

			// if (PLAID_REDIRECT_URI !== '') {
			// 	configs.redirect_uri = PLAID_REDIRECT_URI;
			// }

			if (PLAID_ANDROID_PACKAGE_NAME !== '') {
				configs.android_package_name = PLAID_ANDROID_PACKAGE_NAME;
			}
			const createTokenResponse = await client.linkTokenCreate(configs);
			// prettyPrintResponse(createTokenResponse);
			console.log('THIS IS THE RESONSE LINK TOKEN', createTokenResponse.data);
			PUBLIC_TOKEN = createTokenResponse.data;
			return res.json({ link_token: createTokenResponse.data });
		})
		.catch(next);
});

/*
router.post('/get_link_token', async (req, res) => {
	const response = await client.linkTokenGet(linkToken).catch((err) => {
		if (!linkToken) {
			return 'no link token';
		}
	});
});
*/
/*
router.post('/set_access_token', function (request, response, next) {
  // PUBLIC_TOKEN = request.body.public_token;
	let token = request.body.token;
	console.log(token)
  Promise.resolve()
    .then(async function () {
			console.log('<---en routee--->')
      const tokenResponse = await client.itemPublicTokenExchange({
        public_token: token
      });
			console.log('<---got second (ACCESS) token--->')
      // prettyPrintResponse(tokenResponse);
      ACCESS_TOKEN = tokenResponse.data.access_token;
      ITEM_ID = tokenResponse.data.item_id;
      if (PLAID_PRODUCTS.includes('transfer')) {
        TRANSFER_ID = await authorizeAndCreateTransfer(ACCESS_TOKEN);
      }
      response.json({
        access_token: ACCESS_TOKEN,
        item_id: ITEM_ID,
        error: null,
      });
    })
    .catch(next);
});
*/

router.post('/set_item', async (request, response, next) => {
	try {
		const token = request.body.token;
		const tokenResponse = await client.itemPublicTokenExchange({
			public_token: token
		});

		ACCESS_TOKEN = tokenResponse.data.access_token;
		ITEM_ID = tokenResponse.data.item_id;
		if (PLAID_PRODUCTS.includes('transfer')) {
			TRANSFER_ID = await authorizeAndCreateTransfer(ACCESS_TOKEN);
		}
		response.json({
			access_token: ACCESS_TOKEN,
			item_id: ITEM_ID,
			error: null,
		});
	} catch(error) {
		next(error);
	}
})

router.get('/budgets/:userId', async (req, res, next) => {
	try {
		const user = await User.findById(req.params.userId);
		console.log('<---THIS IS USER--->', user, '<---THIS IS USER--->')
		res.send(user.budgets)
	} catch(error) {
		console.log('GET Budgets route error')
	}
})

router.post('/budgets/add', async (req, res, next) => {
	try {
		console.log('<---IN THE ROUTE AND HERES THE ID: ', req.body.userId)
		const user = await User.findById(req.body.userId);
		const newBudget = req.body
		user.budgets.push(newBudget);
		user.save(function (err) {
			if (!err) console.log('Successfully added account!');
		});
		res.json(newBudget);
	} catch(error) {
		console.log('POST Budgets route error')
	}
})

router.post('/accounts/add', async (req, res, next) => {
	try {
		const user = await User.findById(req.body.userId);
		console.log('<---in the route--->')
		const institution = req.body.metadata.institution;
		const { name, institution_id } = institution;
		const newAccount = {
			userId: req.body.userId,
			accessToken: ACCESS_TOKEN,
			itemId: ITEM_ID,
			institutionId: institution_id,
			institutionName: name,
		}
		user.accounts.push(newAccount);
		user.save(function (err) {
			if (!err) console.log('Successfully added account!');
		});
		return res.json(newAccount);
	} catch(error) {
		console.log('<---/accounts/add POST route ERROR--->')
	}
})

/*
router.post('/accounts/add/:id', async (req, res) => {
	try {
		const { publicToken } = req.body;
		const userId = req.params.id;
		const user = await User.findById(req.params.id);
		const institution = req.body.metadata.institution;
		const { name, institution_id } = institution;
		if (publicToken) {
			const response = await client.itemPublicTokenExchange({
				public_token: publicToken,
			});
			ACCESS_TOKEN = response.data.access_token;
			ITEM_ID = response.data.item_id;
			// Check if account already exists for that specific user using the userId and institutionId
			try {
				const account = await User.find({
					_id: userId,
					'accounts.institutionId': institution_id,
				});

				// if (account) {
				// 	console.log('Account already exists');
				// 	return res.json(account);
				// } else {
					// If account does not exist, save it to DB
					const newAccount = {
						userId: userId,
						accessToken: ACCESS_TOKEN,
						itemId: ITEM_ID,
						institutionId: institution_id,
						institutionName: name,
					}
					user.accounts.push(newAccount);
					user.save(function (err) {
						if (!err) console.log('Successfully added account!');
					});
					return res.json(newAccount);
				// }
			} catch (err) {
				console.log('===Mongo Error===', err);
			}
		}
	} catch (err) {
		console.log('===Plaid Error===', err);
	}
});
*/

router.delete('/accounts/:id', (req, res) => {
	Account.findById(req.params.id).then((account) => {
		// Delete account
		account.remove().then(() => res.json({ success: true }));
	});
});

router.get('/accounts/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		let accounts = []
		user.accounts.map((account) => {
			accounts.push(account)
		})
		console.log("++++++++++THIS IS THE RETURNED ACCOUNTS+++++", accounts)
		return res.json(accounts);
	} catch (err) {
		console.log(err);
	}
});

router.post('/transactions', async (req, res) => {
	/*
	const now = moment();
	const today = now.format('YYYY-MM-DD');
	const thirtyDaysAgo = now.subtract(30, 'days').format('YYYY-MM-DD');
	*/
	console.log('<---HERE IT IS--->', req.body.period)
	const months = req.body.period;
	const now = moment();
	const today = now.format('YYYY-MM-DD');
	const xMonthsAgo = now.subtract(months, 'months').format('YYYY-MM-DD');
	console.log('<---HERE IT IS--->', req.body.plaidData)

	let transactions = [];
	const accounts = req.body.plaidData;

	if (accounts) {
		accounts.forEach(async function (account) {
			const institutionName = account.institutionName;
			const configs = {
				access_token: String(account.accessToken),
				start_date: xMonthsAgo,
				end_date: today,
				options: {
					count: 250,
					offset: 0,
				},
			};
			const transactionsResponse = await client.transactionsGet(configs);
			transactions.push({
				accountName: institutionName,
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
