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
        pagina: 'contact',
        errores: [],
        datos: {},
        mensajeExito: null
    });
});

// Procesar formulario de contacto
router.post('/enviar-contacto', validateContact, async (req, res) => {
    try {
        // 1. Guardar en MongoDB (DESCOMENTADO)
        const nuevoContacto = new Contacto({
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono,
            asunto: req.body.asunto,
            mensaje: req.body.mensaje,
            privacidad: req.body.privacidad === 'on' // Convierte 'on' a true
        });
        
        await nuevoContacto.save();
        console.log('✅ Contacto guardado en MongoDB con ID:', nuevoContacto._id);

        // 2. Enviar email
        await sendContactEmail(req.body);
        console.log('✅ Email enviado correctamente');

        // 3. Renderizar éxito
        res.render('contact', {
            titulo: 'Contacto',
            pagina: 'contact',
            mensajeExito: '¡Mensaje enviado correctamente! Te contactaremos pronto.',
            errores: [],
            datos: {}
        });

    } catch (error) {
        console.error('❌ Error completo:', error);
        
        res.render('contact', {
            titulo: 'Contacto',
            pagina: 'contact',
            errores: ['Error al enviar el mensaje. Por favor, intenta nuevamente.'],
            datos: req.body,
            mensajeExito: null
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
        errores: [],
        datos: {},
        mensajeExito: null
    });
});

// Procesar testimonio
router.post('/enviar-testimonio', validateTestimonio, async (req, res) => {
    try {
        // 1. Guardar en MongoDB (necesitas crear el modelo Testimonio)
        // Por ahora solo enviamos email
        
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

// ============================================
// RUTA PARA VER CONTACTOS (ADMIN)
// ============================================
router.get('/admin/contactos', async (req, res) => {
    try {
        const contactos = await Contacto.find().sort({ fecha: -1 });
        res.render('admin/contactos', {
            titulo: 'Mensajes Recibidos',
            contactos: contactos
        });
    } catch (error) {
        console.error('Error al obtener contactos:', error);
        res.status(500).send('Error al cargar los mensajes');
    }
});

// Marcar mensaje como leído
router.put('/admin/contacto/:id/leer', async (req, res) => {
    try {
        await Contacto.findByIdAndUpdate(req.params.id, { leido: true });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;