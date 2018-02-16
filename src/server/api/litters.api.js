/* eslint-disable no-console */
import express from 'express';

import protectRoute from './auth/protectRoute';
import models from '../models';

const litterRouter = express.Router();
const { Dog } = models;

litterRouter.get('/list', protectRoute(), (req, res) => {
  Dog.scan().attributes(['chipId', 'name', 'uri', 'litter']).exec((err, dogs) => {
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

litterRouter.get('/:litterName', protectRoute(), (req, res) => {
  Dog.query('litter').eq(req.params.litterName).attributes(['chipId', 'name', 'uri', 'litter']).exec((err, dogs) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
    const toReturn = { dogs };
    return res.status(200).json({ success: true, response: toReturn });
  });
});

litterRouter.get('/search/:litterName', protectRoute(), (req, res) => {
  Dog.scan('litter').contains(req.params.litterName).attributes(['chipId', 'name', 'uri', 'litter']).exec((err, dogs) => {
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

// litterRouter.post('/add/:litterName', )

export default litterRouter;
