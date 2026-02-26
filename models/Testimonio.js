const mongoose = require('mongoose');

const testimonioSchema = new mongoose.Schema({
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
        lowercase: true
    },
    servicio: {
        type: String,
        required: [true, 'El servicio es obligatorio']
    },
    calificacion: {
        type: Number,
        required: [true, 'La calificación es obligatoria'],
        min: 1,
        max: 5
    },
    mensaje: {
        type: String,
        required: [true, 'El testimonio es obligatorio'],
        trim: true,
        minlength: [10, 'El testimonio debe tener al menos 10 caracteres'],
        maxlength: [500, 'El testimonio no puede exceder los 500 caracteres']
    },
    consentimiento: {
        type: Boolean,
        required: true
    },
    privacidad: {
        type: Boolean,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    publicado: {
        type: Boolean,
        default: false
    },
    visible: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Testimonio', testimonioSchema);