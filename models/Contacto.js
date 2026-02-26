const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    match: [/^\S+@\S+\.\S+$/, 'Email inválido'],
    lowercase: true,
    trim: true
  },
  telefono: {
    type: String,
    trim: true
  },
  mensaje: {
    type: String,
    required: [true, 'El mensaje es obligatorio'],
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  leido: {
    type: Boolean,
    default: false
  },
  servicio_interes: {
    type: String,
    default: 'General'
  }
});

module.exports = mongoose.model('Contacto', contactoSchema);