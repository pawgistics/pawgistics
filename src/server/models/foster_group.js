// import Dog from './dog';
// import User from './user';

// eslint-disable-next-line
export default (sequelize, Sequelize) => {
  const FosterGroup = sequelize.define('foster_group', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }, {
    underscored: true,
  });

  FosterGroup.associate = (models) => {
    models.foster_group.hasMany(models.user);
    models.foster_group.hasMany(models.dog);
  };

  return FosterGroup;
};
