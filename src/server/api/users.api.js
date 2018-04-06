/* eslint-disable no-console */
import _ from 'lodash';
import express from 'express';

import protectRoute from './auth/protectRoute';
import models from '../models';

const User = models.user;

const usersRouter = express.Router();

usersRouter.route('/')
  .get(protectRoute(), (req, res) => {
    User.listWithFilter(req.query)
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

usersRouter.route('/instructors')
  .get(protectRoute(), (req, res) => {
    User.findAll({
      attributes: ['id', 'first_name', 'last_name'],
      where: {
        admin: true,
      },
    })
      .then(instructors => res.status(200).json(_.map(instructors, (instructor) => {
        const instructorJSON = instructor.toJSON();
        return {
          id: instructorJSON.id,
          name: `${instructorJSON.first_name} ${instructorJSON.last_name}`,
        };
      })))
      .catch(() => res.status(500).json({ message: 'An error occurred.' }));
  });

usersRouter.get('/:id', protectRoute(), (req, res) => {
  User.findByHashid(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(() => res.status(500).json({ message: 'An error occurred.' }));
});

export default usersRouter;
