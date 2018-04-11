/* eslint-disable no-console */
import express from 'express';

import protectRoute from './auth/protectRoute';
import models from '../models';

const Litter = models.litter;

const littersRouter = express.Router();

littersRouter.route('/')
  .get(protectRoute(), (req, res) => {
    Litter.all()
      .then(fosters => res.status(200).json(fosters))
      .catch(() => res.status(500).json({ message: 'An error occurred.' }));
  })
  .post(protectRoute({ requireAdmin: true }), (req, res) => {
    Litter.create({
      name: req.body.name,
    }).then(res.sendStatus(200))
      .catch(() => res.status(500).json({ message: 'An error occurred.' }));
  });

littersRouter.route('/:id')
  .get(protectRoute(), (req, res) => {
    Litter.findByHashid(req.params.id)
      .then(dog => res.status(200).json(dog))
      .catch(() => res.status(500).json({ message: 'An error occurred.' }));
  })
  .put(protectRoute({ requireAdmin: true }), (req, res) => {
    res.sendStatus(501);
  });

export default littersRouter;
