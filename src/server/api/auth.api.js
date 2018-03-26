// @flow

/* eslint-disable no-console */

import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.json';

const authRouter = express.Router();

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
authRouter.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
    if (user) {
      const token = jwt.sign({ id: user.hashid, admin: user.admin }, jwtSecret, {
        expiresIn: 10800, // in seconds
      });
      return res.status(200).json({ success: true, token });
    }
    return res.status(401).json({ success: false, message: info.message });
  })(req, res);
});

export default authRouter;
