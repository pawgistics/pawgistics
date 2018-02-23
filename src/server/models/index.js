// @flow

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
// import populateDev from './sampleData';
// const env = process.env.NODE_ENV || 'development';
const { mySQLConfig } = require('../config.json');


const sequelize = new Sequelize(
  mySQLConfig.DATABASE,
  mySQLConfig.USER_NAME,
  mySQLConfig.PASSWORD,
  {
    host: mySQLConfig.HOST,
    PORT: mySQLConfig.PORT,
    dialect: 'mysql',
    pool: mySQLConfig.pool,
  },
);


const models = {};

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    // eslint-disable-next-line
    const model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

// models.users.belongstoMany(models.dogs, { through: models.fosters });
// models.dogs.belongstoMany(models.users, { through: models.fosters });

models.sequelize = sequelize;
models.Sequelize = Sequelize;

models.Sequelize.sync({ force: true })
  // eslint-disable-next-line
  .then(() => console.log('Sync\'d database.'))
  // eslint-disable-next-line
  .catch(err => console.log(err));


export default models;
