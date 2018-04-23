/* eslint-disable no-console */
import express from 'express';

import protectRoute from './auth/protectRoute';
import models from '../models';

const Checkout = models.checkout;

const checkoutRouter = express.Router();

checkoutRouter.route('/')
  .get(protectRoute(), (req, res) => {
    Checkout.listForUser(req.user, req.query)
      .then((checkouts) => {
        res.status(200).json(checkouts);
      })
      .catch(e => res.status(500).json({ message: e.message }));
  })
  .post(protectRoute(), (req, res) => {
    Checkout.createFromObjectAndUserId(req.body, req.user.id)
      .then(() => res.sendStatus(200))
      .catch(e => res.status(500).json({ message: e.message }));
  });

checkoutRouter.route('/:id')
  .get(protectRoute(), (req, res) => {
    Checkout.findByHashid(req.params.id)
      .then(checkout => (req.user.admin || checkout.user.hashid === req.user.id ?
        res.status(200).json(checkout) :
        res.sendStatus(401)
      ))
      .catch(() => res.status(500).json({ message: 'An error occured' }));
  })
  .put(protectRoute({ requireAdmin: true }), (req, res) => {
    Checkout.updateStatusWithHashid(req.params.id, req.body)
      .then(checkout => res.status(200).json(checkout))
      .catch(() => res.status(500).json({ message: 'An error occured' }));
  });

export default checkoutRouter;
