/* eslint-disable no-console */
import express from 'express';

import protectRoute from './auth/protectRoute';
import models from '../models';
// import createUser from '../util/user';

const { User } = models;
const userRouter = express.Router();

userRouter.get('/:id', protectRoute(), (req, res) => {
  User.query('id').eq(req.params.id).exec((err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
    return res.status(200).json({ success: true, response: user });
  });
});

userRouter.get('/search/fname/:name', protectRoute(), (req, res) => {
  User.scan('fname').contains(req.params.name).or().exec((err, users) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
    return res.status(200).json({ success: true, response: users });
  });
});

userRouter.get('/search/lname/:name', protectRoute(), (req, res) => {
  User.scan('lname').contains(req.params.name).or().exec((err, users) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
    return res.status(200).json({ success: true, response: users });
  });
});

export default userRouter;
