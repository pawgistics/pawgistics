
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
  // TODO: ask about which way models associate
  // Checkout.associate = (models) => {
  //   // Checkout.Volunteer = models.
  // };

  return Checkout;
};
