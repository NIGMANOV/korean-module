const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

// Таблица products в БД

const Product = sequelize.define("products", {
  name: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  description: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  gtin: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  countryOfOrigin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  company: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
});

module.exports = Product;
