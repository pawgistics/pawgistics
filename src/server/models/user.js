import _ from 'lodash';
import argon2 from 'argon2';
import { hashidsUsers, hashidsFosters } from '../util/hashids';

export default (Sequelize, DataTypes) => {
  const User = Sequelize.define('user', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      notEmpty: true,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      notEmpty: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
    },
    uri: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: false,
      defaultValue: 'https://canine-assistants-assets.s3.amazonaws.com/user/default.jpg',
    },
  }, {
    underscored: true,
    hooks: {
      beforeSave: (user) => {
        if (user.changed('password')) {
          return argon2.hash(user.password, { type: argon2.argon2id })
            // eslint-disable-next-line no-param-reassign
            .then((hash) => { user.password = hash; });
        }
        // eslint-disable-next-line compat/compat
        return Promise.resolve();
      },
    },
    getterMethods: {
      hashid() { return hashidsUsers.encode(this.getDataValue('id')); },
    },
    defaultScope: {
      attributes: {
        exclude: ['password', 'hashid'],
        include: ['foster_group_id'],
      },
    },
    scopes: {
      login: {
        attributes: ['id', 'password', 'admin'],
      },
      association: {
        attributes: ['id', 'first_name', 'last_name'],
      },
    },
  });

  User.associate = (models) => {
    models.user.belongsTo(models.foster_group);
    models.user.hasOne(models.dog, {
      foreignKey: 'custodian_id',
    });
    models.user.hasMany(models.dog, {
      foreignKey: 'instructor_id',
    });
    models.user.hasOne(models.checkout, {
      foreignKey: 'volunteer_id',
      onDelete: 'CASCADE',
    });
    // models.checkout.hasOne(models.user, {
    //   foreignKey: 'instructor_id',
    //   onDelete: 'CASCADE',
    // });

    models.user.addScope('detail', {
      attributes: {
        exclude: ['password', 'foster_group_id'],
      },
      include: [
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

  User.findByHashid = hashid => User.scope('detail').findById(hashidsUsers.decode(hashid)[0]);

  User.listWithFilter = filter => User.findAll({
    where: _.omitBy({
      [Sequelize.Op.or]: filter.name ? [
        {
          first_name: {
            [Sequelize.Op.like]: `%${filter.name}%`,
          },
        },
        {
          last_name: {
            [Sequelize.Op.like]: `%${filter.name}%`,
          },
        },
      ] : undefined,
      updated_at: filter.before ? {
        [Sequelize.Op.lt]: filter.before,
      } : undefined,
      // eslint-disable-next-line no-nested-ternary
      admin: filter.user_type === 'instructor' ? true : filter.user_type === 'volunteer' ? false : undefined,
      active: !filter.inactive ? true : undefined,
    }, _.isUndefined),
    order: [
      ['updated_at', 'DESC'],
    ],
    limit: 10,
  });

  User.deleteWithHashid = hashid => User.destroy({ where: { id: hashidsUsers.decode(hashid)[0] } });

  User.updateWithHashid = (hashid, obj) => {
    const user = Object.assign({}, obj);

    return User.update({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      admin: user.admin,
      active: user.active,
      uri: user.uri,
    }, {
      where: {
        id: hashidsUsers.decode(hashid),
      },
    });
  };

  User.prototype.toJSON = function toJSON() {
    // console.log(this);
    const user = Sequelize.Model.prototype.toJSON.call(this);
    // console.log(user);

    if (user.id) user.id = user.hashid;
    delete user.hashid;

    // #####   CHEESY HACK    #####
    // ##### THANKS SEQUELIZE #####
    // eslint-disable-next-line no-underscore-dangle
    if (this._options.attributes === undefined) {
      user.name = `${user.first_name} ${user.last_name}`;
      delete user.first_name;
      delete user.last_name;
    }

    if (user.foster_group_id) user.foster_group_id = hashidsFosters.encode(user.foster_group_id);

    return user;
  };

  return User;
};
