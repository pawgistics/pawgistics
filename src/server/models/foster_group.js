import { hashidsFosters } from '../util/hashids';

export default (Sequelize, DataTypes) => {
  const FosterGroup = Sequelize.define('foster_group', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    underscored: true,
    scopes: {
      association: {
        attributes: ['id'],
      },
    },
  });

  FosterGroup.associate = (models) => {
    models.foster_group.hasMany(models.user);
    models.foster_group.hasMany(models.dog);

    models.foster_group.addScope('defaultScope', {
      include: [
        models.user.scope('association'),
        models.dog.scope('association'),
      ],
    }, { override: true });
  };

  FosterGroup.findByHashid = hashid => FosterGroup.findById(hashidsFosters.decode(hashid)[0]);

  FosterGroup.prototype.toJSON = function toJSON() {
    const fosterGroup = this.dataValues;

    if (fosterGroup.id) fosterGroup.id = hashidsFosters.encode(fosterGroup.id);

    return fosterGroup;
  };

  return FosterGroup;
};
