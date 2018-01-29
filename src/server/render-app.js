// @flow

import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config';
import { isProd } from '../shared/util';

const renderApp = isProd ?
  (title: string) =>
    `<!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="${STATIC_PATH}/css/styles.css">
      </head>
      <body>
        <div class="${APP_CONTAINER_CLASS} container-fluid"></div>
        <script src="${STATIC_PATH}/js/bundle.js"></script>
      </body>
    </html>` :
  (title: string) =>
    `<!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div class="${APP_CONTAINER_CLASS} container-fluid"></div>
        <script src="http://localhost:${WDS_PORT}/dist/js/bundle.js"></script>
      </body>
    </html>`;

export default renderApp;
