// @flow

/* eslint-disable no-console */

import express from 'express';
import passport from 'passport';

import authRouter from './auth.api';
import models from '../models';
import passportConfig from './passport.conf';

const apiRouter = express.Router();

apiRouter.use(passport.initialize());

passportConfig(passport);

// flow-disable-next-line
const User = models.user;

models.sequelize.sync()
  .then(() => console.log('Sync\'d database.'))
  .catch(err => console.log(err, 'Database sync failed.'));

User.findOne({
  where: {
    email: 'kristaps@pawgistics.com',
  },
}).then((user) => {
  if (!user) {
    User.create({
      email: 'kristaps@pawgistics.com',
      password: 'asdf',
      role: 'administrator',
      first_name: 'Kristaps',
      last_name: 'Berzinch',
      phone_number: '9125483690',
      profile_picture: '',
    });
  }
}).catch(err => console.log(err));

apiRouter.use('/auth', authRouter);
// apiRouter.use('/users', require('./users.api'));

export default apiRouter;
