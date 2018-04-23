
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
    decision_status: {
      type: DataTypes.ENUM,
      values: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
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

  // Checkout.associate = (models) => {
  //   models.checkout.belongsTo(models.dog, {
  //     foreignKey: { allowNull: false },
  //     onDelete: 'CASCADE',
  //   });
  //   models.checkout.belongsTo(models.user, {
  //     foreignKey: { allowNull: false },
  //     onDelete: 'CASCADE',
  //   });
  // };

  Checkout.prototype.toJSON = function toJSON() {
    const checkout = Object.assign({}, this.dataValues);
    return checkout;
  };

  return Checkout;
};
