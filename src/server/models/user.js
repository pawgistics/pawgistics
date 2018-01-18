// @flow

import argon2 from 'argon2';

export default (sequelize: any, Sequelize: any) => {
  const User = sequelize.define('user', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      notEmpty: true,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      notEmpty: true,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM,
      values: ['volunteer', 'administrator'],
      defaultValue: 'volunteer',
      notEmpty: true,
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      notEmpty: true,
      allowNull: false,
    },
    first_name: {
      type: Sequelize.STRING,
      // notEmpty: true,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      // notEmpty: true,
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.STRING,
      // notEmpty: true,
      allowNull: false,
    },
    profile_picture: {
      type: Sequelize.STRING,
      // notEmpty: true,
      allowNull: false,
    },
    // vacation_mode: {
    //   // type: Sequelize.STRING,
    //   // notEmpty: true,
    //   // allowNull: false,
    // },
  }, {
    hooks: {
      beforeSave: (user) => {
        if (user.changed()) {
          return argon2.hash(user.password, { type: argon2.argon2id })
            // eslint-disable-next-line no-param-reassign
            .then((hash) => { user.password = hash; });
        }
        // eslint-disable-next-line compat/compat
        return Promise.resolve();
      },
    },
  });

  return User;
};
