// @flow

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

// const env = process.env.NODE_ENV || 'development';
const { db_config } = require('../config.json');

const sequelize = new Sequelize(
  db_config.database,
  db_config.username,
  db_config.password,
  db_config,
);

const db = {};

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
