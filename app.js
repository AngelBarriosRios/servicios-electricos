const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.render('index', { 
        titulo: 'Servicios Eléctricos - Inicio',
        pagina: 'inicio'
    });
});

// Ruta para la página de servicios
app.get('/services', (req, res) => {
    res.render('services', { 
        titulo: 'Servicios Eléctricos - Nuestros Servicios',
        pagina: 'servicios'
    });
});

// Ruta para la pagina de sobre mi

app.get('/about', (req,res)=>{
    res.render('about',{
        titulo:'Servicios electricos - sobre mi',
        pagina: 'about'
    });
});

// Ruta para la pagina de About
app.get('/contact',(req, res)=>{
    res.render('contact',{
    titulo:'Servicios electricos - contacto',
    pagina:'contact'
    })

});

// Ruta para la pagina de politica
app.get('/politica',(req,res)=>{
    res.render('politica',{
    titulo:'Servicios electricos - politica',
    pagina:'politica' 
    })
})
 // Ruta para la pagina de Testimonios
app.get('/testimonios', (req, res)=>{
    res.render('testimonios',{
        titulo:'Servicios electricos - Testimonios',
        pagina:'testimonios'
    });
});


//middleware para procesar los datos de formularios

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// ruta para procesar el formulario de contacto
app.post('/enviar-contacto',(req,res)=>{
    const{nombre, email, telefono, asunto, mensaje, privacidad}= req.body;
    
    console.log('Datos recibidos:',{
        nombre, 
        email,
        telefono,
        asunto,
        mensaje,
        privacidad
    });

    res.render('contact',{
        titulo:'Servicios electricos - Contacto',
        pagina: 'contact',
        mensajeExito:'!Mensaje enviado correcramente! Te contactaremos pronto'
    });
});
//Redirigir about.html a /about

app.get('/about.html', (req,res)=>{
    res.redirect('/about')
})
// Redirigir Services.html a /services
app.get('/Services.html', (req, res) => {
    res.redirect('/services');
});
// Redirigir politicas.html a /politicas
app.get('/politica.html',(req,res)=>{
    res.redirect('/politica');
});
//Redirigir testimonios.html a /testimonios
app.get('/testimonios.html',(req,res)=> {
    res.redirect('/testimonios');
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${port}`);
    console.log(`📱 Página de inicio: http://localhost:${port}`);
    console.log(`🔧 Página de servicios: http://localhost:${port}/services`);
});