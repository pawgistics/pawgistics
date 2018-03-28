import { hashidsLitters } from '../util/hashids';

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
    tableName: 'litters',
    scopes: {
      association: {
        attributes: ['id', 'name'],
      },
    },
  });

  Litter.associate = (models) => {
    Litter.Dog = models.litter.hasMany(models.dog);

    models.litter.addScope('detail', {
      attributes: {
        exclude: ['password', 'foster_group_id'],
      },
      include: [
        models.dog.scope('association'),
      ],
    });
  };

  Litter.findByHashid = hashid => Litter.scope('detail').findById(hashidsLitters.decode(hashid)[0]);

  Litter.prototype.toJSON = function toJSON() {
    const litter = Object.assign({}, this.dataValues);

    if (litter.id) litter.id = hashidsLitters.encode(litter.id);

    return litter;
  };

  return Litter;
};
