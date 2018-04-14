/* eslint-disable no-console */
import express from 'express';

import protectRoute from './auth/protectRoute';
import models from '../models';

const Checkout = models.checkout;

const checkoutRouter = express.Router();

checkoutRouter.route('/')
  .get(protectRoute(), (req, res) => {
    // get all pending checkout requests currently signed in user is responsible for
  })
  .post(protectRoute(), (req, res) => {
    // create new checkout request
  });

checkoutRouter.route('/:id')
  .get(protectRoute({ requireAdmin: true }), (req, res) => {
    Checkout.findById(req.params.id)
      .then(checkout => res.status(200).json(checkout))
      .catch(() => res.status(500).json({ message: 'An error occured' }));
  });

export default checkoutRouter;
