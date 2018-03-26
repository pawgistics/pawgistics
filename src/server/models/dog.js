import { hashidsDogs, hashidsUsers, hashidsLitters, hashidsFosters } from '../util/hashids';

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
    getterMethods: {
      hashid() { return hashidsDogs.encode(this.getDataValue('id')); },
    },
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

  Dog.findByHashid = hashid => Dog.findById(hashidsDogs.decode(hashid)[0]);
  Dog.unHashids = (origDog) => {
    const dog = Object.assign({}, origDog);

    if (dog.id) dog.id = hashidsDogs.decode(dog.id);
    if (dog.litter_id) dog.litter_id = hashidsLitters.decode(dog.litter_id);
    if (dog.instructor_id) dog.instructor_id = hashidsUsers.decode(dog.instructor_id);
    if (dog.foster_group_id) dog.foster_group_id = hashidsFosters.decode(dog.foster_group_id);

    return dog;
  };

  Dog.prototype.toJSON = function toJSON() {
    const dog = Object.assign({}, this.dataValues);

    if (dog.id) dog.id = hashidsDogs.encode(dog.id);
    if (dog.litter_id) dog.litter_id = hashidsLitters.encode(dog.litter_id);
    if (dog.instructor_id) dog.instructor_id = hashidsUsers.encode(dog.instructor_id);
    if (dog.foster_group_id) dog.foster_group_id = hashidsFosters.encode(dog.foster_group_id);

    return dog;
  };

  return Dog;
};
