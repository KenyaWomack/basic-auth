'use strict';

const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');

const UserModel = (sequelize, DataTypes) => {
  const users = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM(['admin', 'editor', 'user']),
      defaultValue: 'user',
      allowNull: false,
      unique: true,
    },
  });
  users.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10).then(hashPassword => {
      user.password = hashPassword;
    });
  });
  users.authenticateBasic = async function(username, password){
    const user = await this.findOne({
      where: {username},
    });
    const isValid = await bcrypt(password, user.password);
    if(isValid) {
      return user;
    }
    throw new Error('the user is not valid');
  };
  return users;
};

module.exports = UserModel;
