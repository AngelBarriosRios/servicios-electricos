const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB (opcional - comenta si no tienes BD aún)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/servicios-electricos')
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error de MongoDB:', err));

const app = express();
const port = process.env.PORT || 3000;

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ============================================
// IMPORTAR RUTAS (ARCHIVOS NUEVOS)
// ============================================
const contactRoutes = require('./routes/contactRoutes');

// Usar rutas
app.use('/', contactRoutes);

// ============================================
// RUTAS DE PÁGINAS ESTÁTICAS
// ============================================

// Inicio
app.get('/', (req, res) => {
    res.render('index', { 
        titulo: 'Servicios Eléctricos - Inicio',
        pagina: 'inicio'
    });
});

// Servicios
app.get('/services', (req, res) => {
    res.render('services', { 
        titulo: 'Servicios Eléctricos - Nuestros Servicios',
        pagina: 'servicios'
    });
});

// Sobre mí
app.get('/about', (req, res) => {
    res.render('about', {
        titulo: 'Servicios electricos - sobre mi',
        pagina: 'about'
    });
});

// Contacto
app.get('/contact', (req, res) => {
    res.render('contact', {
        titulo: 'Servicios electricos - contacto',
        pagina: 'contact'
    });
});

// Política de privacidad
app.get('/politica', (req, res) => {
    res.render('politica', {
        titulo: 'Servicios electricos - politica',
        pagina: 'politica' 
    });
});

// Testimonios
app.get('/testimonios', (req, res) => {
    res.render('testimonios', {
        titulo: 'Servicios electricos - Testimonios',
        pagina: 'testimonios'
    });
});

// Dejar testimonio (¡CORREGIDO: singular!)
app.get('/dejar-testimonio', (req, res) => {
    res.render('dejar-testimonio', {
        titulo: 'Servicios electricos - comparte tu testimonio',
        pagina: 'testimonios'
    });
});

// ============================================
// PROCESAR FORMULARIOS (ahora van a contactRoutes)
// ============================================
// Estas rutas ya están en contactRoutes.js, así que las comentamos
/*
app.post('/enviar-contacto', ...)
app.post('/enviar-testimonio', ...)
*/

// ============================================
// REDIRECCIONES
// ============================================
app.get('/about.html', (req, res) => res.redirect('/about'));
app.get('/Services.html', (req, res) => res.redirect('/services'));
app.get('/politica.html', (req, res) => res.redirect('/politica'));
app.get('/testimonios.html', (req, res) => res.redirect('/testimonios'));
app.get('/dejar-testimonio.html', (req, res) => res.redirect('/dejar-testimonio'));

// ============================================
// INICIAR SERVIDOR
// ============================================
app.listen(port, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${port}`);
    console.log(`📱 Página de inicio: http://localhost:${port}`);
    console.log(`🔧 Página de servicios: http://localhost:${port}/services`);
    console.log(`📝 Dejar testimonio: http://localhost:${port}/dejar-testimonio`);
});