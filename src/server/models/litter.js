export default (sequelize, Sequelize) => {
  const Litter = sequelize.define('litters', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Litter;
};
