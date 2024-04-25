const db = require('../database/models')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const updatePasswordProcess = require('../helpers/updatePasswordProcess.js')
const mailConfig = require('../helpers/nodemailer/mailConfigs.js')
const sendWelcomeMessage = require('../helpers/nodemailer/mailUserCreate.js')

const controller = {
  //#region GET METHODS
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
  // #region POST METHODS
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
            clave: bcrypt.hashSync(req.body.email, 10), // Para la creación del usuario, se utilizará el mail como contraseña.
            telefono: req.body.telefono,
            imagen: req.body.imagen,
            fecha_creacion: new Date(),
            fecha_eliminacion: null,
            Rol_id: req.body.rol,
            Tematica_id: req.body.tematica,
            Administrador_id: req.body.Administrador_id
          }).then(result => {
            sendWelcomeMessage(result, req.body.lang, res)
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
          id: req.body.id
        },
        include: [
          { association: 'rol' },
          { association: 'tematica' },
          { association: 'administrador' }
        ]
      })

      if (user) {

        // VALIDACIÓN DE CONTRASEÑA
        let password = bcrypt.compareSync(req.body.clave, user.clave) // Comparación de la contraseña ingresada con la registrada.

        if (password) {

          let tokenData = { // Lo que se guarda en el token
            time: new Date(),
            data: user
          }
          const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: '24h' // Creación del token.
          })

          if (req.body.keepMeIn) { //Creación de token alternativo en caso de que el usuario elija mantener su sesión iniciada.
            var tokenKeep = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
              expiresIn: '24000h'
            })
          }


          // Eliminación de claves por seguridad
          user.clave = undefined;
          user.administrador.clave = undefined;

          // Devolución de los datos.
          return res.json({
            status: 201,
            data: user,
            accessToken: token,
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
  },
  // #region UPDATE METHODS
  userSelfUpdate: async (req, res) => { //Función para que el usuario modifique sus propios datos.
    const errors = validationResult(req)

    if (errors.isEmpty()) {

      let userExists = await db.Usuario.findOne({
        where: {
          email: req.body.email
        }
      })

      /* Condicional para verificar que el usuario modifique sus datos, 
      pero si está modificando su dirección de email por una que ya está en uso,
      la petición sea rechazada.  */
      if ((!userExists) || (userExists && req.body.id == userExists.id)) {
        db.Usuario.update({
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          telefono: req.body.telefono,
          imagen: req.body.imagen,
          email: req.body.email
        }, {
          where: {
            id: req.body.id
          }
        }).then(data => {
          return res.json({
            status: 2001,
            message: "Actualizado correctamente.",
            data: data
          })
        })
      } else {
        return res.json({
          status: 400,
          error: "User already exists",
          message: "Ya existe un usuario con esta dirección de email."
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

  userSelfUpdatePassword: async (req, res) => { //Cambio de contraseña propia
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      try {
        let user = await db.Usuario.findOne({ //Búsqueda del usuario
          where: {
            id: req.body.id
          }
        })

        if (user) {
          let password = bcrypt.compareSync(req.body.clave, user.clave) //Verificación de que sea el usuario quien está cambiando la contraseña.

          if (password) {
            console.log('\nIniciando proceso de cambio de contraseña.\n')
            updatePasswordProcess(req.body.newClave, user.id, res) // Proceso de cambio de contraseña.
          } else {
            return res.json({
              status: 'error',
              message: 'La contraseña es incorrecta.'
            })
          }
        } else {
          return res.json({
            status: 404,
            message: 'Usuario no encontrado.'
          })
        }
      } catch (err) {
        return res.json({
          status: 'error',
          message: err.message,
          serverMessage: 'Hubo un error en la base de datos al verificar la contraseña del usuario.',
          error: err
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
  //#region DELETE METHOD
  userDelete: async (req, res) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      try {
        let userFound = await db.Usuario.findOne({
          where: {
            id: req.body.id
          }
        })

        if (userFound) {
          db.Usuario.update({
            fecha_eliminacion: new Date()
          }, {
            where: {
              id: userFound.id
            }
          }).then(data => {
            return res.json({
              status: 201,
              message: 'Usuario eliminado correctamente.'
            })
          })
        } else {
          return res.json({
            status: 404,
            error: 'User not found',
            message: 'Usuario no encontrado.'
          })
        }
      } catch (err) {
        console.error(err)
        return res.json({
          status: 5001,
          err: err,
          errMessage: err.message,
          message: 'Hubo un error en la base de datos.'
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
}
module.exports = controller;