// import Dog from './dog';
// import User from './user';

// eslint-disable-next-line
export default (sequelize, Sequelize) => {
  const Foster = sequelize.define('fosters', {
    // id: {
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    // },
    // dog_id: {
    //   // primaryKey: true,
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Dog,
    //     key: 'id',
    //   },
    // },
    // person_id: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: User,
    //     key: 'id',
    //   },
    // },
  });
  // User.belongstoMany(Dog, { as: 'dog_id', through: Foster, foreignKey: 'user_id' });
  return Foster;
};
