const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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
        pagina: 'contact',
        mensajeExito: null,
        errores: [],
        datos: {}
    });
});

// Procesar formulario de contacto
router.post('/enviar-contacto', validateContact, async (req, res) => {
    try {
        console.log('📝 Datos recibidos:', req.body);
        
        // Verificar si MongoDB está conectado
        const dbConnected = mongoose.connection.readyState === 1;
        
        if (dbConnected) {
            // Guardar en MongoDB
            const nuevoContacto = new Contacto({
                nombre: req.body.nombre,
                email: req.body.email,
                telefono: req.body.telefono,
                asunto: req.body.asunto,
                mensaje: req.body.mensaje,
                privacidad: req.body.privacidad === 'on'
            });
            
            await nuevoContacto.save();
            console.log('✅ Contacto guardado en MongoDB con ID:', nuevoContacto._id);
        } else {
            console.log('⚠️ MongoDB no conectado, saltando guardado en BD');
        }

        // Enviar email
        try {
            await sendContactEmail(req.body);
            console.log('✅ Email enviado');
        } catch (emailError) {
            console.log('⚠️ Email no enviado:', emailError.message);
        }

        res.render('contact', {
            titulo: 'Contacto',
            pagina: 'contact',
            mensajeExito: '¡Mensaje enviado correctamente! Te contactaremos pronto.',
            errores: [],
            datos: {}
        });

    } catch (error) {
        console.error('❌ Error al procesar:', error);
        
        res.render('contact', {
            titulo: 'Contacto',
            pagina: 'contact',
            mensajeExito: null,
            errores: ['Error al enviar el mensaje. Por favor, intenta nuevamente.'],
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
        pagina: 'testimonios',
        mensajeExito: null,
        errores: [],
        datos: {}
    });
});

// Procesar testimonio
router.post('/enviar-testimonio', validateTestimonio, async (req, res) => {
    try {
        // Enviar email de testimonio
        await sendTestimonioEmail(req.body);
        console.log('✅ Email de testimonio enviado');

        res.render('dejar-testimonio', {
            titulo: 'Dejar Testimonio',
            pagina: 'testimonios',
            mensajeExito: '¡Gracias por compartir tu experiencia!',
            errores: [],
            datos: {}
        });
    } catch (error) {
        console.error('❌ Error:', error);
        res.render('dejar-testimonio', {
            titulo: 'Dejar Testimonio',
            pagina: 'testimonios',
            errores: ['Error al enviar testimonio'],
            datos: req.body,
            mensajeExito: null
        });
    }
});

module.exports = router;