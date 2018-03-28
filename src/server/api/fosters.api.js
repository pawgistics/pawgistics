/* eslint-disable no-console */

import express from 'express';

import protectRoute from './auth/protectRoute';
import models from '../models';

const FosterGroup = models.foster_group;

const fostersRouter = express.Router();

fostersRouter.route('/')
  .get(protectRoute(), (req, res) => {
    FosterGroup.all()
      .then(fosters => res.status(200).json(fosters))
      .catch(() => res.status(500).json({ message: 'An error occurred.' }));
  })
  .post(protectRoute({ requireAdmin: true }), (req, res) => {
    res.sendStatus(501);
  });

fostersRouter.route('/:id')
  .get(protectRoute(), (req, res) => {
    FosterGroup.findByHashid(req.params.id)
      .then(dog => res.status(200).json(dog))
      .catch(() => res.status(500).json({ message: 'An error occurred.' }));
  })
  .put(protectRoute({ requireAdmin: true }), (req, res) => {
    res.sendStatus(501);
  });

export default fostersRouter;
