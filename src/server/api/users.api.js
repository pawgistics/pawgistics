/* eslint-disable no-console */
import _ from 'lodash';
import express from 'express';
import protectRoute from './auth/protectRoute';
import models from '../models';
import uploadImage from '../util/uploadImage';

const User = models.user;

const usersRouter = express.Router();

usersRouter.route('/')
  .get(protectRoute(), (req, res) => {
    User.listWithFilter(req.query)
      .then(users => res.status(200).json(users))
      .catch(() => res.status(500).json({ message: 'An error occurred.' }));
  })
  .post(protectRoute({ requireAdmin: true }), (req, res) => {
    (async () => {
      delete req.body.uri;
      req.body.password = 'password';
      const user = await User.create(req.body, {
        fields: [
          'password',
          'first_name',
          'last_name',
          'email',
          'phone_number',
          'admin',
          'uri',
        ],
      });
      if (req.body.new_img) {
        try {
          user.update({ uri: await uploadImage('user', user.hashid, req.body.new_img) });
        } catch (err) {
          return res.status(400).json({ message: err.message });
        }
      }
      return res.status(201).json({ message: user });
    })()
      .catch(err => res.status(500).json({ message: err.message }));
  });

usersRouter.get('/instructors', protectRoute(), (req, res) => {
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

usersRouter.route('/:id')
  .get(protectRoute(), (req, res) => {
    User.findByHashid(req.params.id)
      .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'User not found.' });
        }
      })
      .catch(() => res.status(500).json({ message: 'An error occurred.' }));
  })
  .put(protectRoute({ requireAdmin: false }), (req, res) => {
    (async () => {
      delete req.body.uri;
      if (req.body.new_img) {
        try {
          req.body.uri = await uploadImage('user', req.params.id, req.body.new_img);
        } catch (err) {
          return res.status(400).json({ message: err.message });
        }
      }

      return User.updateWithHashid(req.params.id, req.body)
        .then((result) => {
          if (result[0]) {
            res.sendStatus(200);
          } else {
            res.status(404).json({ message: 'User not found.' });
          }
        });
    })()
      .catch(err => res.status(500).json({ message: err.message }));
  })
  .delete(protectRoute({ requireAdmin: true }), (req, res) => {
    User.deleteWithHashid(req.params.id)
      .then((affectedRows) => {
        if (affectedRows > 0) {
          res.sendStatus(200);
        } else {
          res.status(404).json({ message: 'User not found.' });
        }
      })
      .catch(() => res.status(500).json({ message: 'An error occurred.' }));
  });

export default usersRouter;
