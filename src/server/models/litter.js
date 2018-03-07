export default (sequelize, Sequelize) => {
  const Litter = sequelize.define('litter', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      notEmpty: true,
      unique: true,
      allowNull: false,
    },
  }, {
    underscored: true,
  });

  Litter.associate = (models) => {
    Litter.Dog = models.litter.hasMany(models.dog, {
      // foreignKey: { allowNull: false },
      // onDelete: 'RESTRICT',
    });
  };

  return Litter;
};
