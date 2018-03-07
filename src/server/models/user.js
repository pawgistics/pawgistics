import argon2 from 'argon2';

export default (sequelize, Sequelize) => {
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
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
    uri: {
      type: Sequelize.STRING,
      // notEmpty: true,
      allowNull: true,
    },
  }, {
    underscored: true,
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

  User.associate = (models) => {
    models.user.belongsTo(models.foster_group);
    models.user.hasMany(models.dog, {
      // foreignKey: { allowNull: false },
      // onDelete: 'RESTRICT',
      // as: 'dogs',
      // foreignKey: 'instructor_id',
    });
  };

  return User;
};
