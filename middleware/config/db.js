const mongoose = require('mongoose');
require('dotenv').config({ path: './middleware/.env' });

const conectarDB = async () => {
    try {
        console.log('🟡 Intentando conectar a MongoDB...');
        
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Aumenta el timeout
            socketTimeoutMS: 45000, // Aumenta el timeout del socket
        });
        
        console.log('🟢 MongoDB conectado exitosamente');
        
        // Eventos de conexión para debug
        mongoose.connection.on('error', err => {
            console.error('🔴 Error de conexión:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('🟡 Desconectado de MongoDB');
        });
        
    } catch (error) {
        console.error('🔴 Error conectando a MongoDB:');
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = conectarDB;