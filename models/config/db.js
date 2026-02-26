// middleware/config/db.js
const mongoose = require('mongoose');
require('dotenv').config({ path: './middleware/.env' });

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🟢 MongoDB conectado exitosamente');
  } catch (error) {
    console.error('🔴 Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;