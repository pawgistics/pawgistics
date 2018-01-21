// @flow

import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import expressStaticGzip from 'express-static-gzip';

import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config';
import { isProd } from '../shared/util';
import renderApp from './render-app';

import { helloEndpointRoute } from '../shared/routes';
import apiRouter from './api';

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    res.status(400).json({ success: false, message: 'Invalid JSON payload.' });
  } else {
    next(err);
  }
});

app.use(STATIC_PATH, expressStaticGzip('dist', {
  enableBrotli: true,
}));
app.use(STATIC_PATH, express.static('public'));

app.get(helloEndpointRoute(), (req, res) => {
  res.json({ serverMessage: `Hello from the server! (received ${req.params.num})` });
});

app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.send(renderApp(APP_NAME));
});

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
    '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`);
});