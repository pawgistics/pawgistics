// @flow

import express from 'express';
import bodyParser from 'body-parser';

import { isProd, isStaging } from './util/prod';
import apiRouter from './api';

const app = express();

if (!isStaging && isProd) {
  // eslint-disable-next-line global-require
  const compression = require('compression');
  app.use(compression());
}

app.use(bodyParser.json({ limit: '10mb' }));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    res.status(400).json({ message: 'Invalid JSON payload.' });
  } else {
    next(err);
  }
});

app.use('/api', apiRouter);

if (!isStaging) {
  if (isProd) {
    // eslint-disable-next-line global-require
    const expressStaticGzip = require('express-static-gzip');
    app.use('/static', expressStaticGzip('dist', {
      enableBrotli: true,
    }));

    app.get('*', (req, res) => {
      // eslint-disable-next-line global-require
      res.sendFile(require('path').join(__dirname, '../../dist/index.html'));
    });
  } else {
    app.use('/static', express.static('public'));

    app.get('*', (req, res) => {
      res.send('' +
        '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
          '<title>Pawgistics</title>' +
          '<meta name="viewport" content="width=device-width,initial-scale=1">' +
        '</head>' +
        '<body>' +
          '<div class="app"></div>' +
          '<script src="http://localhost:7000/dist/js/bundle.js"></script>' +
        '</body>' +
      '</html>');
    });
  }
}

const WEB_PORT = process.env.PORT || 8080;

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
    '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`);
});
