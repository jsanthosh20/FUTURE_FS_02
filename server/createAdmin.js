require('dotenv').config();

const sequelize = require('./config/db');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

const createAdmin = async () => {
  try {
    await sequelize.sync();
    console.log('Tables synced');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({ username: 'admin', password: hashedPassword });
    console.log('Admin created');
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

createAdmin();