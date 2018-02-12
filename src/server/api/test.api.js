// @flow

import express from 'express';

import protectRoute from './auth/protectRoute';

const testRouter = express.Router();

testRouter.get('/admin', protectRoute({ requireAdmin: true }), (req, res) => {
  res.json({ message: 'Hello from the server. You are an admin.' });
});

testRouter.get('/volunteer', protectRoute(), (req, res) => {
  res.json({ message: 'Hello from the server.' });
});

export default testRouter;
