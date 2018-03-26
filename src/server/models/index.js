// @flow

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import populateDev from '../util/populateDev';
import { isProd } from '../util/prod';

import { mySQLConfig } from '../config.json';

const sequelize = new Sequelize(
  mySQLConfig.database,
  mySQLConfig.username,
  mySQLConfig.password,
  mySQLConfig,
);

const models = {};

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

models.sequelize.sync()
  // eslint-disable-next-line consistent-return
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Sync\'d database.');
    if (!isProd) {
      populateDev(models);
      return null;
    }
  })
  // eslint-disable-next-line no-console
  .catch(err => console.log(err));


export default models;
