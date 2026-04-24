const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Lead = sequelize.define('Lead', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING
  },
  source: {
    type: DataTypes.ENUM('Website', 'LinkedIn', 'Referral', 'Other'),
    defaultValue: 'Website'
  },
  status: {
    type: DataTypes.ENUM('new', 'contacted', 'converted'),
    defaultValue: 'new'
  },
  notes: {
    type: DataTypes.TEXT
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Lead;