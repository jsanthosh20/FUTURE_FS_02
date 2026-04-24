const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config({ path: '../.env' });

const sequelize = require('./config/db');
const Lead = require('./models/Lead');
const Admin = require('./models/Admin');

sequelize.authenticate().then(() => console.log('MySQL connected')).catch(err => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

sequelize.sync().then(async () => {
  const adminCount = await Admin.count();
  if (adminCount === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({ username: 'admin', password: hashedPassword });
    console.log('Admin user created');
  }
  const count = await Lead.count();
  if (count === 0) {
    const sampleLeads = [
      { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', source: 'Website', status: 'new' },
      { name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', source: 'LinkedIn', status: 'contacted' },
      { name: 'Bob Johnson', email: 'bob@example.com', phone: '555-123-4567', source: 'Referral', status: 'converted' },
      { name: 'Alice Brown', email: 'alice@example.com', phone: '444-987-6543', source: 'Website', status: 'new' },
      { name: 'Charlie Wilson', email: 'charlie@example.com', phone: '333-456-7890', source: 'Other', status: 'contacted' },
      { name: 'Diana Davis', email: 'diana@example.com', phone: '222-654-3210', source: 'LinkedIn', status: 'new' }
    ];
    await Lead.bulkCreate(sampleLeads);
    console.log('Sample leads created');
  }
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});