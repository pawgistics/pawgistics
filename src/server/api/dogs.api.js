/* eslint-disable no-console */
import express from 'express';
import protectRoute from './auth/protectRoute';
import models from '../models';
import createDog from '../util/dog';

const { Dog } = models;
const dogsRouter = express.Router();

dogsRouter.get('/', protectRoute(), (req, res) => {
  Dog.scan().exec((err, dogs) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
    return res.status(200).json({ success: true, response: dogs });
  });
});

dogsRouter.get('/:id', protectRoute(), (req, res) => {
  Dog.query('chipId').eq(req.params.id).exec((err, dog) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
    return res.status(200).json({ success: true, response: dog });
  });
});

dogsRouter.get('/search/litter/:litter', protectRoute(), (req, res) => {
  Dog.scan('litter').contains(req.params.litter).exec((err, dogs) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
    return res.status(200).json({ success: true, response: dogs });
  });
});

dogsRouter.get('/search/name/:name', protectRoute(), (req, res) => {
  Dog.scan('name').contains(req.params.name).exec((err, dogs) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
    return res.status(200).json({ success: true, response: dogs });
  });
});

dogsRouter.post('/new', protectRoute({ requireAdmin: true }), (req, res) => {
  createDog({
    chipId: req.body.chipId,
    name: req.body.name,
    litter: req.body.litter,
    fid: req.body.fid,
    color: req.body.color,
    shape: req.body.shape,
    gender: req.body.gender,
    uri: req.param('uri'),
  }).then((dog) => { res.status(200).json({ success: true, message: dog.chipId }); })
    .catch((err) => { res.status(500).json({ success: false, message: err.message }); });
});

dogsRouter.post('/update', protectRoute({ requireAdmin: true }), (req, res) => {
  Dog.update({ chipId: req.body.chipId }, req.body.updates, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'An error occurred.' });
    }
    return res.status(200).json({ success: true, response: null });
  });
});

export default dogsRouter;
