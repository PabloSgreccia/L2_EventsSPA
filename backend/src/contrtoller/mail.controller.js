const nodemailer = require('nodemailer');
const MailConfig = require('../config/mail.config')

const url=process.env.URL

//configuracion cuenta de correo
const transporter = nodemailer.createTransport({
    host: MailConfig.host,
    port: MailConfig.port,
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
        <h3><a href=${url}/user/validation/${user.validationCode}>Confirmar Registro</a></h3>  Muchas gracias,<br>
        Equipo la segunda`

    });
}



module.exports = {
    validationMail,
    transporter
}