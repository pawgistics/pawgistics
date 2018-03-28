/* eslint-disable no-console */
import express from 'express';
import protectRoute from './auth/protectRoute';
import models from '../models';
import { ImageUploader } from '../util/imageUploader';
import { hashidsDogs } from '../util/hashids';

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
      const dog = await Dog.create(Dog.unHashids(req.body), {
        fields: [
          'chip',
          'name',
          'gender',
          'litter_id',
          'instructor_id',
        ],
      });

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

      res.status(200).json({ success: true, message: dog });
    })().catch((err) => {
      res.status(500).json({ success: false, message: err.message });
    });
  });

dogsRouter.get('/:id', protectRoute(), (req, res) => {
  Dog.sequelize.query(`
    SELECT 
      dogs.id,
      dogs.chip,
      dogs.name,
      dogs.gender,
      dogs.uri,
      dogs.instructor_id,
      dogs.litter_id,
      users.first_name,
      users.last_name,
      litters.name as litter_name
  FROM
      dogs,
      users,
      litters
  WHERE
      dogs.id = ${hashidsDogs.decode(req.params.id)}
          AND users.id = dogs.instructor_id
          AND litters.id = dogs.litter_id
  `, { type: Dog.sequelize.QueryTypes.SELECT })
    .then((dog) => {
      res.status(200).json(dog[0]);
    })
    .catch(() => res.status(500).json({ message: 'An error occurred.' }));
});

dogsRouter.get('/search/:name', protectRoute(), (req, res) => {
  Dog.findAll({
    where: {
      name: {
        [Op.like]: `%${req.params.name}%`,
      },
    },
  }).then(dogs => res.status(200).json(dogs))
    .catch(() => res.status(500).json({ message: 'An error occurred.' }));
});

// dogsRouter.post('/update/dog', protectRoute({ requireAdmin: true }), (req, res) => {
//   Dog.update({ chipId: req.body.chipId }, req.body.updates, (err) => {
//     if (err) {
//       return res.status(500).json({ success: false, message: 'An error occurred.' });
//     }
//     return res.status(200).json({ success: true, response: null });
//   });
// });

export default dogsRouter;
