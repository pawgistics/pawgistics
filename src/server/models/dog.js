import User from './user';
import Litter from './litter';

export default (sequelize, Sequelize) => {
  const Dog = sequelize.define('dogs', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    chip: {
      type: Sequelize.INTEGER,
      notEmpty: true,
      allowNull: false,
      unique: true,
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      notEmpty: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      // notEmpty: true,
      allowNull: false,
    },
    gender: {
      type: Sequelize.ENUM,
      values: ['M', 'F'],
    },
    litter_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Litter,
        key: 'id',
      },
    },
    instructor_id: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    uri: {
      type: Sequelize.STRING,
      // notEmpty: true,
      allowNull: true,
    },
  });

  return Dog;
};
