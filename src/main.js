const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin.route');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use('/admins', adminRoutes);

mongoose.connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
