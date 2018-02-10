import models from '../models';

const { Dog } = models;

// eslint-disable-next-line import/prefer-default-export
export const createDog = dog =>
  // eslint-disable-next-line compat/compat
  new Promise((resolve, reject) => {
    Dog.query('chipId').eq(dog.chipId).exec((findErr, foundDog) => {
      if (findErr) {
        reject(findErr);
      } else if (foundDog.count === 0) {
        Dog.create({
          chipId: dog.chipId,
          name: dog.name,
          litter: dog.litter,
          fid: dog.fid,
          color: dog.color,
          shape: dog.shape,
          gender: dog.gender,
          uri: dog.uri,
        }, (createErr, newDog) => {
          if (createErr) {
            reject(createErr);
          } else {
            resolve(newDog);
          }
        });
      } else {
        reject(new Error('Dog already exists!'));
      }
    });
  });
