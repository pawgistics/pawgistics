// @flow

/* eslint-disable no-console */

import express from 'express';
import passport from 'passport';
import passportConfig from './auth/passport.conf';

import authRouter from './auth.api';
import testRouter from './test.api';
import litterRouter from './litters.api';

import fosterRouter from './fosters.api';
import dogsRouter from './dogs.api';
import userRouter from './users.api';

import populateDev from '../util/populateDev';
import { isProd } from '../util/prod';

if (!isProd) {
  populateDev();
}

const apiRouter = express.Router();

apiRouter.use(passport.initialize());
passportConfig(passport);

apiRouter.use('/auth', authRouter);
apiRouter.use('/litter', litterRouter);
apiRouter.use('/foster', fosterRouter);
apiRouter.use('/dogs', dogsRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/test', testRouter);

export default apiRouter;
