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
      // notEmpty: true,
      // allowNull: false,
      unique: true,
      // validate: {
      //   isEmail: true,
      // },
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
  });

  return User;
};
