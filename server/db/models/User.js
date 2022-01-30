// const Sequelize = require('sequelize')
// const db = require('../db')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const Accounts = require("./Account");
const Saving = require("./Saving");
const Subscription = require("./Subscription");

const SALT_ROUNDS = 5;

const mongoose = require("mongoose");
// const keys = require('../../config/keys');
const Schema = mongoose.Schema;

// Create schema to represent a user, defining fields & types as objects of the schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png",
  },
  email: {
    type: String,
    required: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  accounts: [Accounts],
  savings: [Saving],
  subscriptions:[Subscription],
  date: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
  },
});

// /**
//  * instanceMethods
//  */

UserSchema.methods.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

UserSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), process.env.SECRET);
  user.token = token;
  console.log("from user model ", user.token);
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

/**
 * classMethods
 */

UserSchema.statics.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ username: username });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

UserSchema.statics.findByToken = function (token, cb) {
  var user = this;
  jwt.verify(token, process.env.SECRET, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
  console.log("from user model ", token, process.env.SECRET);
};

UserSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_ROUNDS, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// Export the model so we can access outside of this file
const User = mongoose.model("users", UserSchema);
module.exports = User;
