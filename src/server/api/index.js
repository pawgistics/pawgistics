// @flow

/* eslint-disable no-console */

import express from 'express';
import passport from './auth/passport.conf';

import authRouter from './auth.api';

import dogsRouter from './dogs.api';
import usersRouter from './users.api';
import littersRouter from './litters.api';
import fostersRouter from './fosters.api';
import checkoutRouter from './checkouts.api';


const apiRouter = express.Router();

apiRouter.use(passport.initialize());

apiRouter.use('/auth', authRouter);
apiRouter.use('/dogs', dogsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/litters', littersRouter);
apiRouter.use('/fosters', fostersRouter);
apiRouter.use('/checkouts', checkoutRouter);

export default apiRouter;
