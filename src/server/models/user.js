import argon2 from 'argon2';
import dynamoose from 'dynamoose';

export default User = new dynamoose.Schema({
  userId: {
    type: Number,
    validate: function(v) { return v > 0; },
    hashKey: true
  },
  email: {
    type: String,
    validate:function(v) { /* placeholder for an email regex */ return true },
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    validate: RegExp.test('\d{3}-\d{3}-\d{4}')
  },
  address: {
    type: Object,
    required: true
  }
})

// (sequelize: any, Sequelize: any) => {
//   const User = sequelize.define('user', {
//     id: {
//       autoIncrement: true,
//       primaryKey: true,
//       type: Sequelize.INTEGER,
//       allowNull: false,
//     },
//     email: {
//       type: Sequelize.STRING,
//       notEmpty: true,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     password: {
//       type: Sequelize.STRING,
//       notEmpty: true,
//       allowNull: false,
//     },
//     role: {
//       type: Sequelize.ENUM,
//       values: ['volunteer', 'administrator'],
//       defaultValue: 'volunteer',
//       notEmpty: true,
//       allowNull: false,
//     },
//     active: {
//       type: Sequelize.BOOLEAN,
//       defaultValue: true,
//       notEmpty: true,
//       allowNull: false,
//     },
//     first_name: {
//       type: Sequelize.STRING,
//       // notEmpty: true,
//       allowNull: false,
//     },
//     last_name: {
//       type: Sequelize.STRING,
//       // notEmpty: true,
//       allowNull: false,
//     },
//     phone_number: {
//       type: Sequelize.STRING,
//       // notEmpty: true,
//       allowNull: false,
//     },
//     profile_picture: {
//       type: Sequelize.STRING,
//       // notEmpty: true,
//       allowNull: false,
//     },
//     // vacation_mode: {
//     //   // type: Sequelize.STRING,
//     //   // notEmpty: true,
//     //   // allowNull: false,
//     // },
//   }, {
//     hooks: {
//       beforeSave: (user) => {
//         if (user.changed()) {
//           return argon2.hash(user.password, { type: argon2.argon2id })
//             // eslint-disable-next-line no-param-reassign
//             .then((hash) => { user.password = hash; });
//         }
//         // eslint-disable-next-line compat/compat
//         return Promise.resolve();
//       },
//     },
//   });

//   return User;
// };
