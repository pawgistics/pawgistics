export default (sequelize, Sequelize) => {
  const Dog = sequelize.define('dog', {
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
      notEmpty: true,
      allowNull: false,
    },
    gender: {
      type: Sequelize.ENUM,
      values: ['M', 'F'],
    },
    uri: {
      type: Sequelize.STRING,
      notEmpty: true,
      allowNull: true,
    },
  }, {
    underscored: true,
  });

  Dog.associate = (models) => {
    Dog.Litter = models.dog.belongsTo(models.litter, {
      foreignKey: { allowNull: false },
      onDelete: 'RESTRICT',
    });
    Dog.Instructor = models.dog.belongsTo(models.user, {
      foreignKey: { allowNull: false },
      onDelete: 'RESTRICT',
      as: 'instructor',
    });
    Dog.FosterGroup = models.dog.belongsTo(models.foster_group);
  };

  return Dog;
};
