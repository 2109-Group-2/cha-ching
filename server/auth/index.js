const router = require("express").Router();
const { User } = require("../db");
module.exports = router;
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { auth } = require("./middleware/auth");
const jwt = require("jsonwebtoken");
// const keys = require('../config/keys');

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // If valid, use MongoDB's User.findOne() to see if user exists
    User.findOne({ email }).then((user) => {
      // If does not exist
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }

      // If does exist, use bcryptjs to compare submitted password with hashed password in DB
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // If passwords match, create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            accounts: user.accounts,
            savings: user.savings,
          };
          req.user = user;
          console.log("this is the user: ", req.user);
          // Sign our jwt, including payload, keys.secretOrKey from keys.js and set an expiresIn time(in seconds)
          jwt.sign(
            payload,
            process.env.SECRET,
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

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    user.save((err, doc) => {
      if (err) throw err;
      res.json({ status: true, userdata: doc });
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", auth, (req, res) => {
  res.json({
    user: req.user,
  });
});

module.exports = router;
