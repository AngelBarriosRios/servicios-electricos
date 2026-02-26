// middleware/validation.js
const { body, validationResult } = require('express-validator');


// VALIDACIÓN PARA CONTACTO

const validateContact = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El nombre solo puede contener letras y espacios'),
    
    body('email')
        .trim()
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Email inválido')
        .normalizeEmail(),
    
    body('telefono')
        .trim()
        .notEmpty().withMessage('El teléfono es obligatorio')
        .matches(/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/)
        .withMessage('Teléfono inválido'),
    
    body('asunto')
        .notEmpty().withMessage('Debes seleccionar un asunto')
        .isIn(['consulta', 'presupuesto', 'urgencia', 'otro']),
    
    body('mensaje')
        .trim()
        .notEmpty().withMessage('El mensaje es obligatorio')
        .isLength({ min: 10, max: 1000 }).withMessage('El mensaje debe tener entre 10 y 1000 caracteres'),
    
    body('privacidad')
        .notEmpty().withMessage('Debes aceptar la política de privacidad')
        .custom((value) => value === 'on').withMessage('Debes aceptar la política de privacidad'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errores = errors.array().map(err => err.msg);
            return res.render('contact', {
                titulo: 'Contacto',
                pagina: 'contact',
                errores: errores,
                datos: req.body
            });
        }
        next();
    }
];

// VALIDACIÓN PARA TESTIMONIOS

const validateTestimonio = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
    
    body('email')
        .trim()
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Email inválido')
        .normalizeEmail(),
    
    body('servicio')
        .notEmpty().withMessage('Debes seleccionar un servicio'),
    
    body('calificacion')
        .notEmpty().withMessage('Debes dar una calificación')
        .isInt({ min: 1, max: 5 }).withMessage('Calificación inválida'),
    
    body('mensaje')
        .trim()
        .notEmpty().withMessage('El testimonio es obligatorio')
        .isLength({ min: 10, max: 500 }).withMessage('El testimonio debe tener entre 10 y 500 caracteres'),
    
    body('consentimiento')
        .notEmpty().withMessage('Debes aceptar que tu testimonio sea publicado')
        .custom((value) => value === 'on').withMessage('Debes aceptar la publicación'),
    
    body('privacidad')
        .notEmpty().withMessage('Debes aceptar la política de privacidad')
        .custom((value) => value === 'on').withMessage('Debes aceptar la política de privacidad'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errores = errors.array().map(err => err.msg);
            return res.render('dejar-testimonio', {
                titulo: 'Dejar Testimonio',
                pagina: 'testimonios',
                errores: errores,
                datos: req.body
            });
        }
        next();
    }
];

module.exports = {
    validateContact,
    validateTestimonio
};