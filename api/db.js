const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "challenge.db",
});

module.exports = db;
