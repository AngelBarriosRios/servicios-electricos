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
    const { nombre, email, telefono, asunto, mensaje } = datos;
    
    const transporter = createTransporter();
    
    const mailOptions = {
        from: `"Web Servicios" <${process.env.EMAIL_USER || 'test@test.com'}>`,
        to: process.env.EMAIL_TO || 'tu-email@gmail.com',
        subject: `Nuevo contacto: ${asunto}`,
        html: `
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Asunto:</strong> ${asunto}</p>
            <p><strong>Mensaje:</strong> ${mensaje}</p>
        `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.messageId);
    return info;
};

// Enviar email de testimonio
const sendTestimonioEmail = async (datos) => {
    const { nombre, email, servicio, calificacion, mensaje } = datos;
    
    const transporter = createTransporter();
    
    const mailOptions = {
        from: `"Web Testimonios" <${process.env.EMAIL_USER || 'test@test.com'}>`,
        to: process.env.EMAIL_TO || 'tu-email@gmail.com',
        subject: `Nuevo testimonio de ${nombre}`,
        html: `
            <h2>Nuevo testimonio recibido</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Servicio:</strong> ${servicio}</p>
            <p><strong>Calificación:</strong> ${'★'.repeat(calificacion)}</p>
            <p><strong>Mensaje:</strong> ${mensaje}</p>
        `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.messageId);
    return info;
};

module.exports = {
    sendContactEmail,
    sendTestimonioEmail
};