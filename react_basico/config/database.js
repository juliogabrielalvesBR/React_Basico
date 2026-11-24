const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'filmes.sqlite',
  logging: false
});

module.exports = sequelize;
