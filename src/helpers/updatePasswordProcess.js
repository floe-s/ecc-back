import db from '../database/models/index.js';
import bcrypt from 'bcryptjs';

let updatePasswordProcess = async (newPassword, userId, res) => {
    db.Usuario.update({
        clave: bcrypt.hashSync(newPassword, 10)
    }, {
        where: {
            id: userId
        }
    }).then(data => {
        console.log('\nContraseña cambiada.\n')
        return res.json({
            status: 'success',
            message: 'La contraseña se ha modificado correctamente.',
            data: data
        })
    }).catch(err => {
        return res.json({
            status: 'error',
            error: err,
            message: err.message,
            serverMessage: 'Hubo un error al intentar modificar la contraseña del usuario.'
        })
    })
}

export default updatePasswordProcess