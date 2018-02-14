/* eslint-disable no-console */
import express from 'express';

import protectRoute from './auth/protectRoute';
import models from '../models';

const { Dog } = models;
const dogRouter = express.Router();

dogRouter.get('/:id', protectRoute, (req, res) => {
  Dog.query('chipId').eq(req.params.id).exec((err, dog) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
    return res.status(200).json({ success: true, response: dog });
  });
});

dogRouter.get('/search/litter/:litter', protectRoute, (req, res) => {
  Dog.scan('litter').contains(req.params.litter).exec((err, dogs) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
    return res.status(200).json({ success: true, response: dogs });
  });
});

dogRouter.get('/search/name/:name', protectRoute, (req, res) => {
  Dog.scan('name').contains(req.params.name).exec((err, dogs) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
    return res.status(200).json({ success: true, response: dogs });
  });
});

export default dogRouter;
