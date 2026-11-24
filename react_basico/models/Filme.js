const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Filme = sequelize.define('Filme', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ano: {
    type: DataTypes.INTEGER
  }
});

module.exports = Filme;
