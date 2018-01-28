// @flow

/* eslint-disable no-console */

import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { createUser } from '../util/user';

const { jwtSecret } = require('../config.json');

const authRouter = express.Router();

// Register new users
authRouter.post('/register', (req, res) => {
  createUser({
    email: req.body.email,
    password: req.body.password,
    admin: req.body.admin,
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
    address: req.body.address,
    uri: req.body.profile_picture,
  }).then(() => {
    res.status(201).json({ success: true, message: 'Successfully created new user.' });
  }).catch(() => {
    // TODO: Catch actual errors
    res.status(400).json({ success: false, message: 'Email already in use.' });
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
      const token = jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: 10800, // in seconds
      });
      return res.status(200).json({ success: true, token });
    }
    return res.status(401).json({ success: false, message: info.message });
  })(req, res);
});

export default authRouter;
