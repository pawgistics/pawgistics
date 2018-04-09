import AWS from 'aws-sdk';
import parseDataURL from 'data-urls';
import sharp from 'sharp';
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
const uploadImage = async (type, id, dataURL) => {
  const image = parseDataURL(dataURL);
  if (image.mimeType.type !== 'image') {
    throw new Error('Profile picture must be an image.');
  }

  const buf = await sharp(image.body)
    .resize(480, 480)
    .crop(sharp.strategy.entropy)
    .jpeg({
      quality: 92,
      force: true,
    })
    .toBuffer();

  // eslint-disable-next-line compat/compat
  return new Promise((resolve, reject) => {
    s3.upload({
      Key: `${type}/${id}.jpg`,
      Body: buf,
      ACL: 'public-read',
      ContentLength: buf.length,
      ContentType: 'image/jpeg',
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};

export default uploadImage;
