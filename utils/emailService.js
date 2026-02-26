// utils/emailService.js
const nodemailer = require('nodemailer');

// Configurar transporter
const createTransporter = () => {
    if (process.env.NODE_ENV === 'production') {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    } else {
        return nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: process.env.ETHEREAL_USER || 'test',
                pass: process.env.ETHEREAL_PASS || 'test'
            }
        });
    }
};

// Enviar email de contacto
const sendContactEmail = async (datos) => {
    try {
        console.log('📧 Intentando enviar email de contacto...');
        console.log('📤 Datos:', { ...datos, privacidad: undefined }); // Oculta datos sensibles
        
        const { nombre, email, telefono, asunto, mensaje } = datos;
        
        const transporter = createTransporter();
        
        // Verificar que las credenciales existen
        if (process.env.NODE_ENV === 'production') {
            if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
                throw new Error('❌ EMAIL_USER o EMAIL_PASS no están configurados en Railway');
            }
            console.log('✅ Usando Gmail con usuario:', process.env.EMAIL_USER);
        }
        
        const mailOptions = {
            from: `"Servicios Eléctricos" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `Nuevo mensaje de contacto: ${asunto}`,
            html: `
                <h2>📬 Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>Asunto:</strong> ${asunto}</p>
                <p><strong>Mensaje:</strong> ${mensaje}</p>
                <hr>
                <p><small>Enviado desde el formulario web</small></p>
            `
        };
        
        console.log('📨 Enviando email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email enviado EXITOSAMENTE:', info.messageId);
        
        // Si es Ethereal, mostrar URL para ver el email
        if (process.env.NODE_ENV !== 'production') {
            console.log('🔗 Vista previa:', nodemailer.getTestMessageUrl(info));
        }
        
        return info;
        
    } catch (error) {
        console.error('❌ ERROR DETALLADO:');
        console.error('Mensaje:', error.message);
        console.error('Código:', error.code);
        console.error('Comando:', error.command);
        console.error('Respuesta:', error.response);
        console.error('Stack:', error.stack);
        
        // Errores específicos de Gmail
        if (error.code === 'EAUTH') {
            console.error('🔐 Error de autenticación: Credenciales incorrectas o contraseña de app inválida');
        }
        if (error.code === 'ESOCKET') {
            console.error('🌐 Error de conexión: No se pudo conectar con Gmail');
        }
        if (error.responseCode === 535) {
            console.error('🔑 Error 535: Usuario o contraseña incorrectos');
        }
        
        throw error; // Re-lanzar para que lo capture el route handler
    }
};

// Enviar email de testimonio
const sendTestimonioEmail = async (datos) => {
    try {
        console.log('📧 Intentando enviar email de testimonio...');
        
        const { nombre, email, servicio, calificacion, mensaje } = datos;
        
        const transporter = createTransporter();
        
        // Convertir calificación a estrellas
        const estrellas = '★'.repeat(parseInt(calificacion)) + '☆'.repeat(5 - parseInt(calificacion));
        
        const mailOptions = {
            from: `"Servicios Eléctricos" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `⭐ Nuevo testimonio de ${nombre}`,
            html: `
                <h2>⭐ Nuevo testimonio recibido</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Servicio:</strong> ${servicio}</p>
                <p><strong>Calificación:</strong> ${estrellas}</p>
                <p><strong>Mensaje:</strong> ${mensaje}</p>
                <hr>
                <p><small>Este testimonio está pendiente de aprobación</small></p>
            `
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Testimonio enviado:', info.messageId);
        
        if (process.env.NODE_ENV !== 'production') {
            console.log('🔗 Vista previa:', nodemailer.getTestMessageUrl(info));
        }
        
        return info;
        
    } catch (error) {
        console.error('❌ Error al enviar testimonio:', error.message);
        throw error;
    }
};

module.exports = {
    sendContactEmail,
    sendTestimonioEmail
};