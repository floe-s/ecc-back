import transporter from'./mailConfigs.js';
import dotenv from'dotenv';

let message = (user, lang, res) => {
    let msg;
    if(lang === 'pt') {
        msg = `
        
        `
    }else{
        msg = `
        <p>Hola ${user.nombre}!</p>

        <p>Te damos la bienvenida a Espanol Com Carol.</p>

        <p>Para ingresar a la aplicación debes iniciar sesión con tu dirección de mail y, <b>sólo por primera vez</b>, utilizar tu mail como contraseña.</p>

        <p>Aquí un ejemplo: </p>

        <p><b>Dirección de email:</b> espanolcomcarol@gmail.com</p>
        <p><b>Contraseña:</b> espanolcomcarol@gmail.com</p>

        <p><b>ES SUMAMENTE IMPORTANTE QUE CUANDO INICIES LA SESIÓN POR PRIMERA VEZ CAMBIES TU CONTRASEÑA POR LA QUE PREFIERAS.</b></p> 

        <p>Te deseamos mucha suerte en tu camino a aprender Portugues!</p>
        `
    }

    const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: user.email,
        subject: lang === 'es' ? 'No-Contestar: Te damos la bienvenida a Espanol Com Carol' : 'Bem-vindo',
        html: msg
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error(error)
            return res.json({
                status: 400,
                error: error,
                errorMessage: error.message,
                data: 'Hubo un error al intentar enviar el mail.'
            })
        } else {
            return res.json({
                status: 201,
                message: "Usuario creado correctamente",
                data: user,
                email_data: info.response,
                email_message: 'Email enviado'
            })
        }
    })
}

export default message