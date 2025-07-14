const { Sequelize } = require("sequelize");

// ORM sequelize для обхода sql запросов

const sequelize = new Sequelize("moduleb", "postgres", "samir2001", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
