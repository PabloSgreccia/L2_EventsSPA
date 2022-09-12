require('dotenv').config();
const nodemailer = require('nodemailer');
const MailConfig = require('../config/mail.config')

const url = process.env.URL

//configuracion cuenta de correo
const transporter = nodemailer.createTransport({
    host: MailConfig.host,
    port: MailConfig.port,
    secure:MailConfig.secure,
    auth: {
        user: MailConfig.user,
        pass: MailConfig.pass
    }
});

//manda el mail para dar de alta al usuario
async function validationMail(user) {
    await transporter.sendMail({
        from: '"La Segunda" <asha.kuphal50@ethereal.email>', // sender address
        to: user.email, // list of receivers
        subject: "Por favor verifique su registro", // Subject line
        html: `${user.name},<br> Por favor acceda al siguiente link para dar de alta su usuario:<br>
        <h3><a href=http://${url}/user/validation/${user.validationCode}>Confirmar Registro</a></h3>  Muchas gracias,<br>
        Equipo la segunda`

    });


}

async function passRecovery(user,newPassword) {
    await transporter.sendMail({
        from: '"La Segunda" <asha.kuphal50@ethereal.email>', // sender address
        to: user.email, // list of receivers
        subject: "Recuperación de contraseña", // Subject line
        html: `${user.name},<br> Le asignamos una nueva contraseña para ingresar al sistema<br>
        Podrá cambiarla desde Settins una vez logueado<br>
        Nueva contraseña: ${newPassword}<br>
        Muchas gracias,<br>
        Equipo la segunda`

    });


}



module.exports = {
    validationMail,
    transporter,
    passRecovery
}