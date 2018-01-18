// @flow

/* eslint-disable no-console */

import express from 'express';
import passport from 'passport';

import authRouter from './auth.api';
import models from '../models';
import passportConfig from './passport.conf';

const { pawgistics_admin_password } = require('../config.json');

const apiRouter = express.Router();

apiRouter.use(passport.initialize());

passportConfig(passport);

// flow-disable-next-line
const User = models.user;

models.sequelize.sync()
  .then(() => {
    console.log('Database sync success.');
    User.findOne({
      where: {
        email: 'admin@pawgistics.com',
      },
    }).then((user) => {
      if (!user) {
        User.create({
          email: 'admin@pawgistics.com',
          password: pawgistics_admin_password,
          role: 'administrator',
          first_name: 'Administrator',
          last_name: '',
          phone_number: '',
          profile_picture: '',
        });
      }
    }).catch(err => console.log(err));
  })
  .catch(err => console.log(err, 'Database sync failed.'));

apiRouter.use('/auth', authRouter);
// apiRouter.use('/users', require('./users.api'));

export default apiRouter;
