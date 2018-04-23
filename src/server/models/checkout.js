import { hashidsDogs, hashidsUsers, hashidsCheckouts } from '../util/hashids';

export default (Sequelize, DataTypes) => {
  const Checkout = Sequelize.define('checkout', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    decision_status: {
      type: DataTypes.ENUM,
      values: ['Pending', 'Approved', 'Rejected'],
      allowNull: false,
      defaultValue: 'Pending',
    },
    decision_reason: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
    },
    pickup_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    underscored: true,
    defaultScope: {
      attributes: {
        exclude: ['user_id', 'dog_id'],
      },
    },
  });

  Checkout.associate = (models) => {
    models.checkout.belongsTo(models.user, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE',
    });
    models.checkout.belongsTo(models.dog, {
      foreignKey: { allowNull: false },
      onDelete: 'CASCADE',
    });

    models.checkout.addScope('detail', {
      attributes: {
        exclude: ['instructor_id', 'litter_id', 'foster_group_id', 'custodian_id'],
      },
      include: [
        { model: models.dog.scope('association') },
        { model: models.user.scope('association') },
      ],
    });

    Checkout.listForUser = (user, filter) => (user.admin ?
      Checkout.findAll({
        include: [
          {
            model: models.dog.scope('association'),
            where: { instructor_id: hashidsUsers.decode(user.id) },
          },
          { model: models.user.scope('association') },
        ],
        where: {
          decision_status: 'Pending',
        },
        order: [
          ['updated_at', 'DESC'],
        ],
      }) :
      Checkout.findAll({
        include: [
          {
            model: models.dog.scope('association'),
            where: filter.dog_name ? { name: { [Sequelize.Op.like]: `%${filter.dog_name}%` } } : undefined,
          },
          {
            model: models.user.scope('association'),
            where: { id: hashidsUsers.decode(user.id) },
          },
        ],
        where: filter.before ? {
          updated_at: { [Sequelize.Op.lt]: filter.before },
        } : undefined,
        order: [
          ['updated_at', 'DESC'],
        ],
        limit: 10,
      }));

    Checkout.listForDog = (dogId, filter) => Checkout.findAll({
      include: [
        {
          model: models.dog.scope('association'),
          where: { id: hashidsDogs.decode(dogId) },
        },
        {
          model: models.user.scope('association'),
          where: filter.user_name ? {
            [Sequelize.Op.or]: [
              {
                first_name: {
                  [Sequelize.Op.like]: `%${filter.user_name}%`,
                },
              },
              {
                last_name: {
                  [Sequelize.Op.like]: `%${filter.user_name}%`,
                },
              },
            ],
          } : undefined,
        },
      ],
      where: filter.before ? {
        updated_at: { [Sequelize.Op.lt]: filter.before },
      } : undefined,
      order: [
        ['updated_at', 'DESC'],
      ],
      limit: 10,
    });
  };

  Checkout.findByHashid = hashid => Checkout.scope('detail').findById(hashidsCheckouts.decode(hashid)[0]);

  Checkout.createFromObjectAndUserId = (checkout, userId) => Checkout.create({
    user_id: hashidsUsers.decode(userId),
    dog_id: hashidsDogs.decode(checkout.dog_id),
    pickup_date: checkout.pickup_date,
    return_date: checkout.return_date,
    description: checkout.description,
  }, {
    fields: [
      'user_id',
      'dog_id',
      'pickup_date',
      'return_date',
      'description',
      'decision_reason',
    ],
  });

  Checkout.updateStatusWithHashid = (hashid, update) => Checkout.update({
    decision_status: update.status,
    decision_reason: update.reason,
  }, {
    where: {
      id: hashidsCheckouts.decode(hashid),
    },
  });

  Checkout.prototype.toJSON = function toJSON() {
    const checkout = Object.assign({}, this.dataValues);

    if (checkout.id) checkout.id = hashidsCheckouts.encode(checkout.id);

    return checkout;
  };

  return Checkout;
};
