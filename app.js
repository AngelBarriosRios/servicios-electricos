const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// ============================================
// CONEXIÓN A MONGODB
// ============================================
console.log('🟡 Conectando a MongoDB...');
console.log('📦 URI:', process.env.MONGODB_URI ? '✓ Definida' : '✗ No definida');

// Verificar si tenemos la URI
if (!process.env.MONGODB_URI) {
    console.error('❌ ERROR: MONGODB_URI no está definida');
    console.log('📝 En Railway, agrega variable: MONGODB_URI');
}

// Conectar a MongoDB (intentamos conectar pero no detenemos la app si falla)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/servicios-electricos')
    .then(() => {
        console.log('✅ Conectado a MongoDB Atlas');
        console.log('📊 Base de datos:', mongoose.connection.name);
    })
    .catch(err => {
        console.error('❌ Error de MongoDB:');
        console.error('🔴', err.message);
        console.log('⚠️ La app funcionará sin base de datos (solo emails)');
    });

const app = express();
const port = process.env.PORT || 3000;

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// IMPORTAR RUTAS
const contactRoutes = require('./routes/contactRoutes');

// Usar rutas
app.use('/', contactRoutes);

// RUTAS DE PÁGINAS ESTÁTICAS
app.get('/', (req, res) => {
    res.render('index', { 
        titulo: 'Servicios Eléctricos - Inicio',
        pagina: 'inicio'
    });
});

app.get('/services', (req, res) => {
    res.render('services', { 
        titulo: 'Servicios Eléctricos - Nuestros Servicios',
        pagina: 'servicios'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        titulo: 'Servicios electricos - sobre mi',
        pagina: 'about'
    });
});

app.get('/politica', (req, res) => {
    res.render('politica', {
        titulo: 'Servicios electricos - politica',
        pagina: 'politica' 
    });
});

app.get('/testimonios', (req, res) => {
    res.render('testimonios', {
        titulo: 'Servicios electricos - Testimonios',
        pagina: 'testimonios'
    });
});

app.get('/dejar-testimonio', (req, res) => {
    res.render('dejar-testimonio', {
        titulo: 'Servicios electricos - comparte tu testimonio',
        pagina: 'testimonios'
    });
});

// REDIRECCIONES
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
    console.log(`📱 Contacto: http://localhost:${port}/contact`);
});