
export default (Sequelize, DataTypes) => {
  const OutingReport = Sequelize.define('outing_report', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bath: {
      type: DataTypes.ENUM,
      values: ['Yes', 'Sort Of', 'No'],
      allowNull: false,
    },
    bath_detail: {
      type: DataTypes.TEXT,
    },
    dry: {
      type: DataTypes.ENUM,
      values: ['Yes', 'Sort Of', 'No'],
      allowNull: false,
    },
    dry_detail: {
      type: DataTypes.TEXT,
    },
    car: {
      type: DataTypes.ENUM,
      values: ['Yes', 'Sort Of', 'No'],
      allowNull: false,
    },
    car_detail: {
      type: DataTypes.TEXT,
    },
    walk: {
      type: DataTypes.ENUM,
      values: ['Yes', 'Loose Leash Sometimes', 'Stalls or Lags', 'No'],
      allowNull: false,
    },
    walk_detail: {
      type: DataTypes.TEXT,
    },
    checkin: {
      type: DataTypes.ENUM,
      values: ['Yes', 'Used Treats', 'Rarely', 'No'],
      allowNull: false,
    },
    accidents: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    accidents_detail: {
      type: DataTypes.TEXT,
    },
    reaction: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    reaction_detail: {
      type: DataTypes.TEXT,
    },
    outing_comments: {
      type: DataTypes.TEXT,
    },
    yes_no_items: {
      type: DataTypes.TEXT,
    },
    yes_no_score: {
      type: DataTypes.TEXT,
    },
    like_me_items: {
      type: DataTypes.TEXT,
    },
    like_me_score: {
      type: DataTypes.TEXT,
    },
    ick: {
      type: DataTypes.TEXT,
    },
    numbers: {
      type: DataTypes.ENUM,
      values: ['presented', 'posted', 'bring', 'application'],
    },
    letters: {
      type: DataTypes.ENUM,
      values: ['presented', 'posted', 'buttons'],
    },
    baby: {
      type: DataTypes.ENUM,
      values: ['gentle', 'gentle mouthy', 'mouthy hurts', 'hurts'],
    },
    walking: {
      type: DataTypes.TEXT,
    },
    interaction: {
      type: DataTypes.TEXT,
    },
  });

  return OutingReport;
};
