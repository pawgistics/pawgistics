// @flow

/* eslint-disable no-console */

import express from 'express';
import passport from 'passport';
import models from '../models';

const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config.json');

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
        role: req.body.role || 'volunteer',
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        profile_picture: req.body.profile_picture || '',
      })
        .then(() => res.status(201).json({ success: true, message: 'Successfully created new user.' }))
        .catch(() => res.status(400).json({ success: false, message: 'An error occurred.' }));
    }
  }).catch(err => console.log(err));
  // new User(_.omit(req.body, '_id')).save(err => {
  //   if (err) {
  //     if (err.name == 'ValidationError') {
  //       return res.status(400).json({
  //         success: false,
  //         message: _.values(err.errors).pop().message
  //       });
  //     } else if (err.code == 11000) {
  //       var keys = /\.users\.\$(.+?)_1 dup key: { : "(.+?)" }/g.exec(err.errmsg);
  //       return res.status(400).json({
  //         success: false,
  //         message: _.capitalize(keys[1]) + ' ' + keys[2] + ' is already in use.'
  //       });
  //     }
  //     return res.status(400).json({ success: false, message: 'An error occurred.'});
  //   }
  //   res.status(201).json({ success: true, message: 'Successfully created new user.' });
  // });
  res.sendStatus(201);
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
authRouter.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('Logged in!');
  console.log(req.user.id);
  const token = jwt.sign({ id: req.user.id }, jwt_secret, {
    expiresIn: 10800, // in seconds
  });
  res.status(200).json({ success: true, token });
});

export default authRouter;
