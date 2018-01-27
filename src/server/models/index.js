// @flow

import dynamoose from 'dynamoose';
import User from './user';
// Should I read the environment variable or is the import below best/acceptable practice?
import { isProd } from '../../shared/util';
import populateDev from './sampleData';
// const env = process.env.NODE_ENV || 'development';
const { awsConfig } = require('../config.json');

dynamoose.AWS.config.update({
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey,
  region: awsConfig.region,
});
if (!isProd) {
  dynamoose.local();
  populateDev();
}
const uTable = dynamoose.model('userTable', User);
const db = {
  userTable: uTable,
};

export default db;
