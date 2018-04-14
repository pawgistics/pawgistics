import _ from 'lodash';
import { hashidsDogs, hashidsUsers, hashidsLitters, hashidsFosters } from '../util/hashids';

export default (Sequelize, DataTypes) => {
  const Dog = Sequelize.define('dog', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chip: {
      type: DataTypes.INTEGER,
      notEmpty: true,
      allowNull: false,
      unique: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      notEmpty: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['M', 'F'],
    },
    uri: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: true,
    },
  }, {
    underscored: true,
    getterMethods: {
      hashid() { return hashidsDogs.encode(this.getDataValue('id')); },
    },
    scopes: {
      association: {
        attributes: ['id', 'name'],
      },
    },
  });

  Dog.associate = (models) => {
    Dog.Instructor = models.dog.belongsTo(models.user, {
      foreignKey: { allowNull: false },
      onDelete: 'RESTRICT',
      as: 'instructor',
    });
    Dog.Custodian = models.dog.belongsTo(models.user, {
      foreignKey: { allowNull: true },
      onDelete: 'RESTRICT',
      as: 'custodian',
    });
    Dog.Litter = models.dog.belongsTo(models.litter, {
      foreignKey: { allowNull: false },
      onDelete: 'RESTRICT',
    });
    Dog.FosterGroup = models.dog.belongsTo(models.foster_group);
    models.dog.hasOne(models.checkout);

    models.dog.addScope('defaultScope', {
      attributes: {
        exclude: ['instructor_id', 'litter_id'],
      },
      include: [
        { model: models.user.scope('association'), as: 'instructor' },
        models.litter.scope('association'),
      ],
    }, { override: true });

    models.dog.addScope('detail', {
      attributes: {
        exclude: ['instructor_id', 'litter_id', 'foster_group_id', 'custodian_id'],
      },
      include: [
        { model: models.user.scope('association'), as: 'instructor' },
        models.litter.scope('association'),
        { model: models.user.scope('association'), as: 'custodian' },
        {
          model: models.foster_group.scope('association'),
          include: [
            models.user.scope('association'),
            models.dog.scope('association'),
          ],
        },
      ],
    });
  };

  Dog.findByHashid = (hashid, ...rest) => Dog.scope('detail').findById(hashidsDogs.decode(hashid)[0], ...rest);

  Dog.listWithFilter = filter => Dog.findAll({
    where: _.pickBy({
      name: filter.name ? {
        [Sequelize.Op.like]: `%${filter.name}%`,
      } : undefined,
      litter_id: filter.litter_id ? hashidsLitters.decode(filter.litter_id) : undefined,
      instructor_id: filter.instructor_id ? hashidsUsers.decode(filter.instructor_id) : undefined,
    }),
  });

  Dog.createFromObject = (obj) => {
    const dog = Object.assign({}, obj);

    if (dog.litter_id) dog.litter_id = hashidsLitters.decode(dog.litter_id);
    if (dog.instructor_id) dog.instructor_id = hashidsUsers.decode(dog.instructor_id);
    return Dog.create(dog, {
      fields: [
        'chip',
        'name',
        'gender',
        'litter_id',
        'instructor_id',
      ],
    });
  };

  Dog.updateWithHashid = (hashid, obj) => {
    const dog = Object.assign({}, obj);

    if (dog.litter_id) dog.litter_id = hashidsLitters.decode(dog.litter_id);
    if (dog.instructor_id) dog.instructor_id = hashidsUsers.decode(dog.instructor_id);
    if (dog.foster_group_id) dog.foster_id = hashidsFosters.decode(dog.foster_id);
    if (dog.custodian_id) dog.custodian_id = hashidsUsers.dencode(dog.custodian_id);

    return Dog.update({
      chip: dog.chip,
      name: dog.name,
      gender: dog.gender,
      litter_id: dog.litter_id,
      instructor_id: dog.instructor_id,
      foster_group_id: dog.foster_group_id,
      active: dog.active,
      uri: dog.uri,
    }, {
      where: {
        id: hashidsDogs.decode(hashid),
      },
    });
  };

  Dog.prototype.toJSON = function toJSON() {
    const dog = Object.assign({}, this.dataValues);

    if (dog.id) dog.id = hashidsDogs.encode(dog.id);
    if (dog.litter_id) dog.litter_id = hashidsLitters.encode(dog.litter_id);
    if (dog.instructor_id) dog.instructor_id = hashidsUsers.encode(dog.instructor_id);
    if (dog.foster_group_id) dog.foster_group_id = hashidsFosters.encode(dog.foster_group_id);
    if (dog.custodian_id) dog.custodian_id = hashidsUsers.encode(dog.custodian_id);

    return dog;
  };

  return Dog;
};
