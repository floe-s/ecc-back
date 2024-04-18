const { body } = require('express-validator');
const validation = {
    userCreate: [
        body('nombre')
            .notEmpty().trim().withMessage('Debe introducir un nombre'),
        body('apellido')
            .notEmpty().trim().withMessage('Debe introducir un apellido'),
        body('email')
            .notEmpty().trim().withMessage('Debe introducir una dirección de email')
            .isEmail().withMessage('Debe introducir una dirección de email válida.'),
        body('telefono')
            .notEmpty().trim().withMessage('Debe introducir un número de teléfono.')
            .isLength({ min: 6, max: 12 }).withMessage('Debe introducir un número de teléfono válido.'),
        body('imagen')
            .notEmpty().trim().withMessage('Debe seleccionar una imagen de perfil.'),
    ],
    userLoginProcess: [
        body('email')
            .notEmpty().trim().withMessage('Debe introducir una dirección de email.')
            .isEmail().withMessage('Debe introducir una dirección de email válida.'),
        body('clave')
            .notEmpty().trim().withMessage('Debe introducir una contraseña.')
            .isLength({ min: 6 }).withMessage('La contraseña debe tener 6 caracteres como mínimo.'),
    ],
    userSelfUpdate: [
        body('nombre')
            .notEmpty().trim().withMessage('Debe introducir un nombre.'),
        body('apellido')
            .notEmpty().trim().withMessage('Debe introducir un apellido.'),
        body('telefono')
            .notEmpty().trim().withMessage('Debe introducir un número de teléfono.')
            .isLength({ min: 6 }).withMessage('Debe introducir un número de teléfono válido.'),
        body('imagen')
            .notEmpty().trim().withMessage('Debe seleccionar una imagen.'),
    ],
    userSelfUpdatePassword: [
        body('id')
            .notEmpty().trim().withMessage('Debe introducir el ID del usuario.'),
        body('clave')
            .notEmpty().trim().withMessage('Debe introducir una contraseña.')
            .isLength({ min: 6 }).withMessage('La contraseña debe tener 6 caracteres como mínimo'),
        body('newClave')
            .notEmpty().trim().withMessage('Debe introducir una contraseña.')
            .isLength({ min: 6 }).withMessage('La contraseña debe tener 6 caracteres como mínimo'),
    ]
}

module.exports = validation