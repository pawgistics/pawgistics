/* eslint-disable no-console */
import express from 'express';
import protectRoute from './auth/protectRoute';
import models from '../models';
import { ImageUploader } from '../util/imageUploader';
// import { hashidsDogs } from '../util/hashids';

const Dog = models.dog;
const { Op } = models.Sequelize;

const dogsRouter = express.Router();

dogsRouter.route('/')
  .get(protectRoute(), (req, res) => {
    Dog.all()
      .then(dogs => res.status(200).json(dogs))
      .catch(() => res.status(500).json({ message: 'An error occurred.' }));
  })
  .post(protectRoute({ requireAdmin: true }), (req, res) => {
    (async () => {
      const dog = await Dog.createFromObject(req.body);
      if (req.body.data_uri) {
        const s3uri = `https://s3.amazonaws.com/canine-assistants-assets/${dog.hashid}`;
        console.log(s3uri);
        console.log('dog created');

        await ImageUploader({
          filename: `${dog.hashid}`,
          file: req.body.data_uri,
          filetype: req.body.filetype,
        });
        console.log('file uploaded');
        await dog.update({ uri: s3uri });
      }

      res.status(200).json({ success: true, message: dog });
    })()
      .catch(err => res.status(500).json({ success: false, message: err.message }));
  });

dogsRouter.route('/:id')
  .get(protectRoute(), (req, res) => {
    Dog.findByHashid(req.params.id)
      .then(dog => res.status(200).json(dog))
      .catch(() => res.status(500).json({ message: 'An error occurred.' }));
  })
  .post(protectRoute({ requireAdmin: true }), (req, res) => {
    (async () => {
      console.log(req.body);
      if (req.body.data_uri) {
        const s3uri = `https://s3.amazonaws.com/canine-assistants-assets/${req.body.id}`;
        console.log(s3uri);
        console.log('dog created');

        await ImageUploader({
          filename: `${req.body.id}`,
          file: req.body.data_uri,
          filetype: req.body.filetype,
        });
        console.log('file uploaded');
        req.body.uri = s3uri;
      }
      Dog.updateFromObject(req.body)
        .then(res.status(200).json({ success: true }));
    })()
      .catch(err => res.status(500).json({ success: false, message: err.message }));
  });

dogsRouter.get('/search/:name', protectRoute(), (req, res) => {
  Dog.findAll({
    where: {
      name: {
        [Op.like]: `%${req.params.name}%`,
      },
    },
  })
    .then(dogs => res.status(200).json(dogs))
    .catch(() => res.status(500).json({ message: 'An error occurred.' }));
});

export default dogsRouter;
