/* eslint-disable no-console */
import express from 'express';
import protectRoute from './auth/protectRoute';
import models from '../models';
// import { createDog } from '../util/dog';
// import { ImageUploader } from '../util/imageUploader';

const Dog = models.dog;
const { Op } = models.Sequelize;

const dogsRouter = express.Router();

dogsRouter.route('/')
  .get(protectRoute(), (req, res) => {
    Dog.all()
      .then(dogs => res.status(200).json(dogs))
      .catch(() => res.status(500).json({ message: 'An error occurred.' }));
  });

dogsRouter.get('/:id', protectRoute(), (req, res) => {
  Dog.findOne({ where: { id: req.params.id } })
    .then(dog => res.status(200).json(dog))
    .catch(() => res.status(500).json({ message: 'An error occurred.' }));
});

// dogsRouter.get('/search/litter/:litter', protectRoute(), (req, res) => {
//   Dog.scan('litter').contains(req.params.litter).exec((err, dogs) => {
//     if (err) {
//       return res.status(500).json({ success: false, message: 'An error occurred.' });
//     }
//     return res.status(200).json({ success: true, response: dogs });
//   });
// });

dogsRouter.get('/search/name/:name', protectRoute(), (req, res) => {
  Dog.findAll({
    where: {
      name: {
        [Op.like]: `%${req.params.name}%`,
      },
    },
  }).then(dogs => res.status(200).json(dogs))
    .catch(() => res.status(500).json({ message: 'An error occurred.' }));
});

// dogsRouter.post('/', protectRoute({ requireAdmin: true }), (req, res) => {
//   const s3uri = `https://s3.amazonaws.com/canine-assistants-assets/${req.body.chipId}`;
//   createDog({
//     chipId: req.body.chipId,
//     name: req.body.name,
//     litter: req.body.litter,
//     fid: req.body.fid,
//     color: req.body.color,
//     shape: req.body.shape,
//     gender: req.body.gender,
//     dob: req.body.dob,
//     uri: s3uri,
//   }).then((dog) => {
//     console.log('dog created');
//     ImageUploader({
//       filename: `${req.body.chipId}`,
//       file: req.body.data_uri,
//       filetype: req.body.filetype,
//     }).then(() => {
//       console.log('file uploaded');
//       res.status(200).json({ success: true, message: dog.chipId });
//     })
//       .catch(err => res.status(500).json({ success: false, message: err.message }));
//   }).catch((err) => {
//     res.status(500).json({ success: false, message: err.message });
//   });
// });

// dogsRouter.post('/update/dog', protectRoute({ requireAdmin: true }), (req, res) => {
//   Dog.update({ chipId: req.body.chipId }, req.body.updates, (err) => {
//     if (err) {
//       return res.status(500).json({ success: false, message: 'An error occurred.' });
//     }
//     return res.status(200).json({ success: true, response: null });
//   });
// });

export default dogsRouter;
