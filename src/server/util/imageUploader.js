import AWS from 'aws-sdk';
import { awsConfig, s3Config } from '../config.json';

AWS.config.update({
  region: awsConfig.AWS_REGION,
  accessKeyId: awsConfig.AWS_ACCESS_KEY_ID,
  secretAccessKey: awsConfig.AWS_SECRET_ACCESS_KEY,
});
const s3 = new AWS.S3({
  params: { Bucket: s3Config.BUCKET_NAME },
});

// eslint-disable-next-line import/prefer-default-export
export const ImageUploader = options =>
  // eslint-disable-next-line compat/compat
  new Promise((resolve, reject) => {
    const buf = Buffer.from(options.file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    s3.upload({
      Key: options.filename,
      Body: buf,
      ACL: 'public-read',
      ContentLength: buf.length,
      ContentType: options.filetype,
    }, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
