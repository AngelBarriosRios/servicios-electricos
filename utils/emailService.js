const nodemailer = require('nodemailer');

// Configurar transporte de email
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER || 'tu-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'tu-contraseña'
    }
});

// Enviar email de contacto
const sendContactEmail = async (data) => {
    const { nombre, email, telefono, asunto, mensaje } = data;
    
    const mailOptions = {
        from: '"Servicios Eléctricos" <' + (process.env.EMAIL_USER || 'tu-email@gmail.com') + '>',
        to: process.env.EMAIL_USER || 'tu-email@gmail.com',
        subject: `Nuevo mensaje de contacto: ${asunto}`,
        html: `
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Asunto:</strong> ${asunto}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${mensaje}</p>
        `
    };
    
    return await transporter.sendMail(mailOptions);
};

// Enviar email de testimonio
const sendTestimonioEmail = async (data) => {
    const { nombre, email, servicio, calificacion, mensaje } = data;
    
    const mailOptions = {
        from: '"Servicios Eléctricos" <' + (process.env.EMAIL_USER || 'tu-email@gmail.com') + '>',
        to: process.env.EMAIL_USER || 'tu-email@gmail.com',
        subject: 'Nuevo testimonio recibido',
        html: `
            <h2>Nuevo testimonio</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Servicio:</strong> ${servicio}</p>
            <p><strong>Calificación:</strong> ${'⭐'.repeat(calificacion)}</p>
            <p><strong>Testimonio:</strong></p>
            <p>${mensaje}</p>
        `
    };
    
    return await transporter.sendMail(mailOptions);
};

module.exports = {
    sendContactEmail,
    sendTestimonioEmail
};