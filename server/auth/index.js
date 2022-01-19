const router = require('express').Router();
const { User } = require('../db');
module.exports = router;
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { auth } = require('./middleware/auth');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

router.post('/login', async (req, res) => {
	try {
		const username = req.body.username;
		const password = req.body.password;

		// o: async await
		// If valid, use MongoDB's User.findOne() to see if user exists
		User.findOne({ username }).then((user) => {
			// If does not exist
			if (!user) {
				return res.status(404).json({ usernamenotfound: 'Username not found' });
			}

			// o: async await below
			// If does exist, use bcryptjs to compare submitted password with hashed password in DB
			bcrypt.compare(password, user.password).then((isMatch) => {
				if (isMatch) {
					// If passwords match, create JWT Payload
					const payload = {
						id: user.id,
						name: user.name,
					};
					req.user = user;
          console.log(req.user)
					// Sign our jwt, including payload, keys.secretOrKey from keys.js and set an expiresIn time(in seconds)
					
					// o: async await as well here
					jwt.sign(
						payload,
						keys.SECRET,
						{
							expiresIn: 31556926, // 1 year in seconds
						},

						// If successful, append the token to a Bearer string(ex: in passport.js opts.jwtFromRequest = ExtractJwt.dromAuthHeaderAsBearerToken())
						(err, token) => {
							res.json({
								success: true,
								token: token,
							});
						}
					);
				}
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
});

router.post('/signup', async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		user.save((err, doc) => {
			if (err) throw err;
			res.json({ status: true, userdata: doc });
		});
	} catch (err) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			res.status(401).send('User already exists');
		} else {
			next(err);
		}
	}
});

router.get('/me', auth, (req, res) => {
	res.json({
		user: req.user,
	});
});

// router.get('/me', async (req, res, next) => {
// 	try {
// 		var result = await User.find().exec();
// 		res.send(result);
// 	} catch (error) {
// 		res.status(500).send(error);
// 	}
// });

module.exports = router;
