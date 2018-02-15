/* eslint-disable no-console */

import express from 'express';

import protectRoute from './auth/protectRoute';
import models from '../models';

const fosterRouter = express.Router();
const { Dog } = models;
// const { Foster } = models;
const { User } = models;

fosterRouter.get('/list', protectRoute, (req, res) => {
  const toReturn = {};
  User.scan('fid').not().null().attributes(['id', 'fname', 'lname', 'uri', 'fid'])
    .exec((err, users) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'An error occurred.' });
      }
      users.forEach((user) => {
        if (!(user.fid in toReturn)) {
          toReturn[user.fid] = {
            users: [],
            dogs: [],
          };
        }
        toReturn[user.fid].users.push(user);
      });
      return Dog.scan('fid').not().null().attributes(['chipId', 'name', 'uri', 'fid'])
        .exec((err1, dogs) => {
          if (err1) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'An error occurred.' });
          }
          dogs.forEach((dog) => {
            if (!(dog.fid in toReturn)) {
              toReturn[dog.fid] = {
                users: [],
                dogs: [],
              };
            }
            toReturn[dog.fid].dogs.push(dog);
          });
          return res.status(200).json({ success: true, response: toReturn });
        });
    });
});

fosterRouter.get('/dogs/:fid', protectRoute, (req, res) => {
  Dog.query('fid').eq(req.params.fid).attributes(['chipId', 'name', 'uri', 'fid'])
    .exec((err, dogs) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'An error occurred.' });
      }
      return res.status(200).json({ success: true, response: dogs });
    });
});

fosterRouter.get('/users/:fid', protectRoute, (req, res) => {
  User.query('fid').eq(req.params.fid).attributes(['id', 'fname', 'lname', 'uri', 'fid'])
    .exec((err, users) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'An error occurred.' });
      }
      return res.status(200).json({ success: true, response: users });
    });
});

fosterRouter.get('/:fid', protectRoute, (req, res) => {
  const toReturn = {};
  User.query('fid').eq(req.params.fid).attributes(['id', 'fname', 'lname', 'uri', 'fid'])
    .exec((err, users) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'An error occurred.' });
      }
      users.forEach((user) => {
        if (!(user.fid in toReturn)) {
          toReturn[user.fid] = {
            users: [],
            dogs: [],
          };
        }
        toReturn[user.fid].users.push(user);
      });
      return Dog.query('fid').eq(req.params.fid).attributes(['chipId', 'name', 'uri', 'fid'])
        .exec((err1, dogs) => {
          if (err1) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'An error occurred.' });
          }
          dogs.forEach((dog) => {
            if (!(dog.fid in toReturn)) {
              toReturn[dog.fid] = {
                users: [],
                dogs: [],
              };
            }
            toReturn[dog.fid].dogs.push(dog);
          });
          return res.status(200).json({ success: true, response: toReturn });
        });
    });
});

export default fosterRouter;
