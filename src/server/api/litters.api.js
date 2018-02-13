/* eslint-disable no-console */
import express from 'express';

import protectRoute from './auth/protectRoute';
import models from '../models';

const litterRouter = express.Router();
const { Dog } = models;

litterRouter.get('/list', protectRoute, (req, res) => {
  Dog.query('litter').attributes('chipId, name, uri, litter').exec((err, dogs) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
    const toReturn = {};
    dogs.forEach((dog) => {
      if (!(dog.litter in toReturn)) {
        toReturn[dog.litter] = [];
      }
      toReturn[dog.litter].push(dog);
    });
    return res.status(200).json({ success: true, response: toReturn });
  });
});
