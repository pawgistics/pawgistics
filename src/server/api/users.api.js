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
  })
  .post(protectRoute({ requireAdmin: true }), (req, res) => {
    User.create(req.body, {
      fields: [
        'email',
        'password',
        'admin',
        'first_name',
        'last_name',
        'phone_number',
      ],
    })
      .then(() => res.status(201).json({ success: true, message: 'Successfully created new user.' }))
      .catch(err => res.status(400).json({ success: false, message: err }));
  });

usersRouter.get('/:id', protectRoute(), (req, res) => {
  User.findByHashid(req.params.id)
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
  })
    .then(users => res.status(200).json(users))
    .catch(() => res.status(500).json({ message: 'An error occurred.' }));
});

export default usersRouter;
