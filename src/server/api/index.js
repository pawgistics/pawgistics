// @flow

/* eslint-disable no-console */

import express from 'express';
import passport from 'passport';

import authRouter from './auth.api';
import passportConfig from './passport.conf';

const apiRouter = express.Router();

apiRouter.use(passport.initialize());
passportConfig(passport);
apiRouter.use('/auth', authRouter);
// apiRouter.use('/users', require('./users.api'));

export default apiRouter;
