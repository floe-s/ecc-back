const db = require('../database/models')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const controller = {
  user: async (req, res) => {

    try {

      let users = await db.Usuario.findAll({
        include: [
          { association: 'rol' },
          { association: 'tematica' },
          { association: 'administrador' }
        ]
      })

      return res.json({
        status: 200,
        message: 'Founded ' + users.length + ' users.',
        data: users
      })
    } catch (err) {
      return res.json({
        status: 500,
        message: "Database Error",
        errMessage: err.message,
        err: err
      })
    }

  },

  userCreate: async (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) { //Validacion de campos vacíos

      try {

        let userExists = await db.Usuario.findOne({ //Validación de que el usuario no exista.
          where: {
            email: req.body.email
          }
        })

        if (!userExists) { // Si el usuario no existe, pasa a crearse en la base de datos.
          db.Usuario.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            clave: bcrypt.hashSync(req.body.clave, 10),
            telefono: req.body.telefono,
            imagen: req.body.imagen,
            fecha_creacion: new Date(),
            fecha_eliminacion: new Date(),
            Rol_id: req.body.rol,
            Tematica_id: req.body.tematica,
            Administrador_id: req.body.Administrador_id
          }).then(result => {
            return res.json({
              status: 201,
              message: 'Usuario creado exitosamente.',
              data: result
            })
          })
        } else {
          return res.json({
            status: 5001,
            message: 'Este usuario ya existe.',
            errorCode: 'USER_ALREADY_EXIST'
          })
        }
      } catch (err) {
        console.error(err)
        return res.json({
          status: 5000,
          message: 'Error en la base de datos.',
          err: err,
          errorCode: err.message
        })
      }
    } else {
      return res.json({
        status: 5000,
        error: 'Empty fields.',
        message: errors.mapped()
      })
    }
  },
  userLoginProcess: async (req, res) => {
    const errors = validationResult(req)

    // VALIDACIONES DE CAMPOS. HECHOS POR EXPRESS-VALIDATOR
    if (errors.isEmpty()) {

      // VALIDACIÓN DE EXISTENCIA DE USUARIO.
      let user = await db.Usuario.findOne({
        where: {
          email: req.body.email
        },
        include: [
          { association: 'rol' },
          { association: 'tematica' },
          { association: 'administrador' }
        ]
      })

      if (user) {

        // VALIDACIÓN DE CONTRASEÑA
        let password = bcrypt.compareSync(req.body.password, user.clave) // Comparación de la contraseña ingresada con la registrada.

        if (password) {

          let tokenData = { // Lo que se guarda en el token
            time: new Date(),
            data: user
          }
          const token = jwt.sign(process.env.TOKEN_SECRET, tokenData, {
            expiresIn: '24h' // Creación del token.
          })

          if (req.body.keepMeIn){ //Creación de token alternativo en caso de que el usuario elija mantener su sesión iniciada.
            var tokenKeep = jwt.sign(process.env.TOKEN_SECRET, tokenData, {
              expiresIn: '24000h'
            })
          }

          return res.json({
            status: 201,
            data: token,
            keepMeIn: req.body.keepMeIn ? 'true' : 'false',
            tokenKeep: tokenKeep ? tokenKeep : 'false', 
          })

        } else {
          return res.json({
            status: 403,
            error: "Invalid password",
            message: "Contraseña incorrecta"
          })
        }

      } else {
        return res.json({
          status: 404,
          error: 'User not found',
          message: 'Usuario no encontrado.'
        })
      }
    } else {
      return res.json({
        status: 5000,
        error: 'Empty fields.',
        message: errors.mapped()
      })
    }
  }
};

module.exports = controller;