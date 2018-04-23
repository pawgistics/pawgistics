/* eslint-disable no-console */
import express from 'express';

import protectRoute from './auth/protectRoute';
import models from '../models';
import { hashidsUsers, hashidsDogs } from '../util/hashids';

const Checkout = models.checkout;

const checkoutRouter = express.Router();

checkoutRouter.route('/')
  .get(protectRoute(), (req, res) => {
    const uid = hashidsUsers.decode(req.body.id);
    Checkout.sequelize.query(
      `SELECT 
        checkouts.pickup_date,
        checkouts.return_date,
        checkouts.dog_id,
        checkouts.description
      FROM
        checkouts,
        dogs
      WHERE
        checkouts.dog_id = dogs.id
        AND dogs.instructor_id = ${uid}`,
      { type: Checkout.sequelize.QueryTypes.SELECT },
    )
      .then((checkouts) => {
        res.status(200).json(checkouts);
      })
      .catch(e => res.status(500).json({ message: e.message }));
  })
  .post(protectRoute(), (req, res) => {
    console.log(req.body);
    const did = hashidsDogs.decode(req.body.dog_id);
    const uid = hashidsUsers.decode(req.body.user_id);
    Checkout.create({
      description: req.body.desc,
      pickup_date: req.body.start,
      return_date: req.body.end,
      dog_id: did,
      volunteer_id: uid,
    })
      .then(() => res.status(200))
      .catch(e => res.status(500).json({ message: e.message }));
  });

checkoutRouter.route('/:id')
  .get(protectRoute({ requireAdmin: true }), (req, res) => {
    Checkout.findById(req.params.id)
      .then(checkout => res.status(200).json(checkout))
      .catch(() => res.status(500).json({ message: 'An error occured' }));
  });

export default checkoutRouter;
