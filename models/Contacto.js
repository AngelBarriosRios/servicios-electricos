// models/Contacto.js
const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
    },
    telefono: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        trim: true
    },
    asunto: {
        type: String,
        required: [true, 'El asunto es obligatorio'],
        enum: ['consulta', 'presupuesto', 'urgencia', 'otro']
    },
    mensaje: {
        type: String,
        required: [true, 'El mensaje es obligatorio'],
        trim: true,
        minlength: [10, 'El mensaje debe tener al menos 10 caracteres'],
        maxlength: [1000, 'El mensaje no puede exceder los 1000 caracteres']
    },
    privacidad: {
        type: Boolean,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    leido: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Contacto', contactoSchema);