
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
    },
    requested_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    decision_status: {
      type: DataTypes.ENUM,
      values: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    decision_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    decision_reason: {
      type: DataTypes.TEXT,
    },
    pickup_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  Checkout.associate = (models) => {
    // Checkout.Dog = models.checkout.belongsTo(models.dog, {
    //   foreignKey: { allowNull: false },
    //   onDelete: 'CASCADE',
    // });
    models.checkout.addScope('detail', {
      attributes: {
        exclude: ['dog_id', 'volunteer_id'],
      },
      include: [
        { model: models.user.scope('association'), as: 'volunteer' },
        { model: models.dog.scope('association'), as: 'dog' },
      ],
    });
  };

  Checkout.prototype.toJSON = function toJSON() {
    const checkout = Object.assign({}, this.dataValues);
    return checkout;
  };

  return Checkout;
};
