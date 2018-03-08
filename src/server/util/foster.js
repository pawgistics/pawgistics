// import shortid from 'shortid';
// import models from '../models';
//
// // const { Foster } = models;
// const { Dog } = models;
// const { User } = models;
//
// // eslint-disable-next-line import/prefer-default-export
// export const createFoster = foster =>
//   // eslint-disable-next-line compat/compat
//   new Promise((resolve, reject) => {
//     const fosterId = shortid.generate();
//     let dogsCount = 0;
//     let userCount = 0;
//     foster.dogs.forEach((dog) => {
//       Dog.update({ chipId: dog }, { fid: fosterId }, (err) => {
//         if (err) {
//           reject(new Error('An error occurred while updating fosters. Please try again.'));
//         }
//         dogsCount += 1;
//         if (dogsCount === foster.dogs.length - 1 && userCount === foster.users.length - 1) {
//           resolve(null);
//         }
//       });
//     });
//     foster.users.forEach((volunteer) => {
//       User.update({ id: volunteer }, { fid: fosterId }, (err) => {
//         if (err) {
//           reject(new Error('An error occurred while updating fosters. Please try again.'));
//         }
//         userCount += 1;
//         if (dogsCount === foster.dogs.length - 1 && userCount === foster.users.length - 1) {
//           resolve(null);
//         }
//       });
//     });
//   });
