/* eslint-disable no-console */
import express from 'express';

import protectRoute from './auth/protectRoute';
import models from '../models';
// import createUser from '../util/user';

const User = models.user;
const { Op } = models.Sequelize;

const usersRouter = express.Router();

usersRouter.route('/')
  .get(protectRoute(), (req, res) => {
    User.all()
      .then(users => res.status(200).json(users))
      .catch(() => res.status(500).json({ message: 'An error occurred.' }));
  });

usersRouter.get('/:id', protectRoute(), (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => res.status(200).json(user))
    .catch(() => res.status(500).json({ message: 'An error occurred.' }));
});

usersRouter.get('/search/name/:name', protectRoute(), (req, res) => {
  User.findAll({
    where: {
      [Op.or]: [
        {
          first_name: {
            [Op.like]: `%${req.params.name}%`,
          },
        },
        {
          last_name: {
            [Op.like]: `%${req.params.name}%`,
          },
        },
      ],
    },
  }).then(users => res.status(200).json(users))
    .catch(() => res.status(500).json({ message: 'An error occurred.' }));
});

export default usersRouter;
