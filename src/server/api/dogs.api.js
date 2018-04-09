/* eslint-disable no-console */
import express from 'express';
import protectRoute from './auth/protectRoute';
import models from '../models';
import uploadImage from '../util/uploadImage';

const Dog = models.dog;

const dogsRouter = express.Router();

dogsRouter.route('/')
  .get(protectRoute(), (req, res) => {
    Dog.listWithFilter(req.query)
      .then(dogs => res.status(200).json(dogs))
      .catch(() => res.status(500).json({ message: 'An error occurred.' }));
  })
  .post(protectRoute({ requireAdmin: true }), (req, res) => {
    (async () => {
      const dog = await Dog.createFromObject(req.body);
      if (req.body.new_img) {
        try {
          dog.update({ uri: await uploadImage('dog', dog.hashid, req.body.new_img) });
        } catch (err) {
          return res.status(400).json({ success: false, message: err.message });
        }
      }
      return res.status(200).json({ success: true, message: dog });
    })()
      .catch(err => res.status(500).json({ success: false, message: err.message }));
  });

dogsRouter.route('/:id')
  .get(protectRoute(), (req, res) => {
    Dog.findByHashid(req.params.id)
      .then(dog => res.status(200).json(dog))
      .catch(() => res.status(500).json({ message: 'An error occurred.' }));
  })
  .put(protectRoute({ requireAdmin: true }), (req, res) => {
    (async () => {
      delete req.body.uri;
      if (req.body.new_img) {
        try {
          req.body.uri = await uploadImage('dog', req.params.id, req.body.new_img);
        } catch (err) {
          return res.status(400).json({ success: false, message: err.message });
        }
      }

      return Dog.updateWithHashid(req.params.id, req.body)
        .then((result) => {
          if (result[0]) {
            res.status(200).json({ success: true });
          } else {
            res.status(404).json({ success: false, message: 'Dog not found.' });
          }
        });
    })()
      .catch(err => res.status(500).json({ success: false, message: err.message }));
  });

export default dogsRouter;
