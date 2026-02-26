// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contacto = require('../models/Contacto');
const { validateContact, validateTestimonio } = require('../middleware/validation');
const { sendContactEmail, sendTestimonioEmail } = require('../utils/emailService');

// ============================================
// RUTAS DE CONTACTO
// ============================================

// Mostrar formulario de contacto
router.get('/contact', (req, res) => {
    res.render('contact', {
        titulo: 'Contacto',
        pagina: 'contact'
    });
});

// Procesar formulario de contacto
router.post('/enviar-contacto', validateContact, async (req, res) => {
    try {
        const nuevoContacto = new Contacto({
            ...req.body,
            privacidad: req.body.privacidad === 'on'
        });
        
        await nuevoContacto.save();
        await sendContactEmail(req.body);
        
        res.render('contact', {
            titulo: 'Contacto',
            pagina: 'contact',
            mensajeExito: '¡Mensaje enviado correctamente! Te contactaremos pronto.'
        });
    } catch (error) {
        console.error('Error:', error);
        res.render('contact', {
            titulo: 'Contacto',
            pagina: 'contact',
            errores: ['Error al enviar el mensaje'],
            datos: req.body
        });
    }
});

// ============================================
// RUTAS DE TESTIMONIOS
// ============================================

// Mostrar formulario de testimonio
router.get('/dejar-testimonio', (req, res) => {
    res.render('dejar-testimonio', {
        titulo: 'Dejar Testimonio',
        pagina: 'testimonios'
    });
});

// Procesar testimonio
router.post('/enviar-testimonio', validateTestimonio, async (req, res) => {
    try {
        await sendTestimonioEmail(req.body);
        
        res.render('dejar-testimonio', {
            titulo: 'Dejar Testimonio',
            pagina: 'testimonios',
            mensajeExito: '¡Gracias por compartir tu experiencia!'
        });
    } catch (error) {
        console.error('Error:', error);
        res.render('dejar-testimonio', {
            titulo: 'Dejar Testimonio',
            pagina: 'testimonios',
            errores: ['Error al enviar testimonio'],
            datos: req.body
        });
    }
});

module.exports = router;