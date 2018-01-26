// @flow

/* eslint-disable no-console */

import express from 'express';
import passport from 'passport';
import models from '../models';

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config.json');

// flow-disable-next-line
const User = models.user;
const authRouter = express.Router();

// Register new users
authRouter.post('/register', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (!user) {
      User.create({
        email: req.body.email,
        password: req.body.password,
        role: 'volunteer',
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        profile_picture: req.body.profile_picture,
      }).then(() => {
        res.status(201).json({ success: true, message: 'Successfully created new user.' });
      })
        .catch((err) => {
          if (err.name === 'SequelizeValidationError') {
            res.status(400).json({ success: false, message: 'Failed to validate user properties.' });
          }
          console.log(err.keys);
          res.status(500).json({ success: false, message: 'An error occurred.' });
        });
    } else {
      res.status(400).json({ success: false, message: 'Email already in use.' });
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  });
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
authRouter.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
    if (user) {
      const token = jwt.sign({ id: user.id, admin: (user.role === 'administrator') }, jwtSecret, {
        expiresIn: 10800, // in seconds
      });
      return res.status(200).json({ success: true, token });
    }
    return res.status(401).json({ success: false, message: info.message });
  })(req, res);
});

export default authRouter;
