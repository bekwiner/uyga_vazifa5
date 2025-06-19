const express = require('express');
const mongoose = require('mongoose');
const app = express();

const adminRoutes = require('./src/routes/adminRoutes.js');
const transportRoutes = require('./src/routes/transportRoutes.js');
const ticketRoutes = require('./src/routes/ticketRoutes.js');
const customerRoutes = require('./src/routes/customerRoutes.js');

app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/ticket', ticketRoutes);
app.use('/api/customer', customerRoutes);

mongoose.connect('mongodb://localhost:27017/eticket')
  .then(() => {
    console.log('MongoDB ulandi');
    app.listen(5000, () => {
      console.log('Server 5000-portda ishlayapti 🚀');
    });
  })
  .catch(err => console.error('MongoDB ulanishda xatolik:', err));
