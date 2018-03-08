// import argon2 from 'argon2';
// import shortid from 'shortid';
// import models from '../models';
//
// const { User } = models;
//
// // eslint-disable-next-line import/prefer-default-export
// export const createUser = user =>
//   // eslint-disable-next-line compat/compat
//   new Promise((resolve, reject) => {
//     User.query('email').eq(user.email).exec((findErr, foundUser) => {
//       if (findErr) {
//         reject(findErr);
//       } else if (foundUser.count === 0) {
//         argon2.hash(user.password, { type: argon2.argon2id }).then(hash =>
//           User.create({
//             id: shortid.generate(),
//             email: user.email,
//             password: hash,
//             admin: user.admin,
//             first_name: user.first_name,
//             last_name: user.last_name,
//             phone: user.phone,
//             address: user.address,
//             uri: user.uri,
//           }, (createErr, newUser) => {
//             if (createErr) {
//               reject(createErr);
//             } else {
//               resolve(newUser);
//             }
//           }));
//       } else {
//         reject(new Error('User already exists!'));
//       }
//     });
//   });
