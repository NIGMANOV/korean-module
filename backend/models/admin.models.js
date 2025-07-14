const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

// Таблица admins в БД

const admin = sequelize.define("admins", {
  admin_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: true
  },
});

module.exports = admin;
