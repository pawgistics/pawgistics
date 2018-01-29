// @flow

/* eslint-disable no-console */

import express from 'express';
import passport from 'passport';

import authRouter from './auth.api';
import passportConfig from './auth/passport.conf';

import populateDev from '../util/populateDev';

populateDev();

const apiRouter = express.Router();

apiRouter.use(passport.initialize());
passportConfig(passport);

apiRouter.use('/auth', authRouter);
// apiRouter.use('/users', require('./users.api'));

export default apiRouter;
