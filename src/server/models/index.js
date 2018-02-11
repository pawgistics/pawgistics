// @flow

import fs from 'fs';
import path from 'path';
import dynamoose from 'dynamoose';
// import User from './user';
// Should I read the environment variable or is the import below best/acceptable practice?
import { isProd } from '../../shared/util';
// import populateDev from './sampleData';
// const env = process.env.NODE_ENV || 'development';
const { awsConfig } = require('../config.json');

dynamoose.AWS.config.update({
  accessKeyId: awsConfig.AWS_ACCESS_KEY_ID,
  secretAccessKey: awsConfig.AWS_SECRET_ACCESS_KEY,
  region: awsConfig.AWS_REGION,
});

if (!isProd) {
  dynamoose.local();
}

const models = {};

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    // eslint-disable-next-line
    console.log(file) 
    // eslint-disable-next-line
    const model = require(path.join(__dirname, file)).default;
    // eslint-disable-next-line
    models[model.$__.name] = model;
  });

export default models;
