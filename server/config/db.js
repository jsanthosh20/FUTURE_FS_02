const { Sequelize } = require('sequelize');

console.log('In config/db.js - DB_HOST:', process.env.DB_HOST);
console.log('In config/db.js - DB_USER:', process.env.DB_USER);
console.log('In config/db.js - DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('In config/db.js - DB_NAME:', process.env.DB_NAME);
console.log('In config/db.js - DB_PORT:', process.env.DB_PORT);

const uri = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT || 3306}/${process.env.DB_NAME}`;
console.log('Connection URI:', uri);

const sequelize = new Sequelize(uri, {
  dialect: 'mysql',
  logging: console.log
});

module.exports = sequelize;