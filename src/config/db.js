const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/e-ticket', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB ulandi ');
  } catch (err) {
    console.error('MongoDB ulanish xatosi ', err);
    process.exit(1);
  }
};

module.exports = connectDB;

