import db from '../database/models/index.js'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import updatePasswordProcess from '../helpers/updatePasswordProcess.js'
import sendWelcomeMessage from '../helpers/nodemailer/mailUserCreate.js'
import createToken from '../helpers/generateToken.js'
const tokenKey = process.env.TOKEN_SECRET

const controller = {
  //#region GET METHODS
  user: async (req, res) => {

    try {

      let users = await db.Usuario.findAll({
        where: {
          fecha_eliminacion: null
        }, include: [
          { association: 'rol' },
          { association: 'tematica' },
          { association: 'administrador' }
        ]
      })

      return res.status(200).json({
        message: 'Founded ' + users.length + ' users.',
        data: users
      })
    } catch (err) {
      return res.status(500).json({
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
        const { email } = req.body
        let userExists = await db.Usuario.findOne({ //Validación de que el usuario no exista.
          where: {
            email,
          }
        })

        if (!userExists) { // Si el usuario no existe, pasa a crearse en la base de datos.

          const { nombre, apellido, telefono, imagen, rol, tematica, Administrador_id } = req.body

          db.Usuario.create({
            nombre,
            apellido,
            email,
            clave: bcrypt.hashSync(email, 10), // Para la creación del usuario, se utilizará el mail como contraseña.
            telefono,
            imagen,
            fecha_creacion: new Date(),
            fecha_eliminacion: null,
            Rol_id: rol,
            Tematica_id: tematica,
            Administrador_id
          }).then(result => {
            sendWelcomeMessage(result, req.body.lang, res)
          })
        } else {
          return res.status(400).json({
            errors: {
              email: {
                msg: 'Este usuario ya existe.',
              }
            }
          })
        }
      } catch (err) {
        console.error(err)
        return res.status(500).json({
          message: 'Error en la base de datos.',
          err: err,
          errorCode: err.message
        })
      }
    } else {
      return res.status(400).json({
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
          email: req.body.email,
          fecha_eliminacion: null,
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

          user.clave = undefined;
          user.administrador.clave = undefined;

          let token = createToken(user, new Date(), '24h', tokenKey)

          if (req.body.keepMeIn) { //Creación de token alternativo en caso de que el usuario elija mantener su sesión iniciada.
            var tokenKeep = createToken(user, new Date(), '24000h', tokenKey)
          }

          req.session.user = user;
          req.session.apiKey = token;

          // Devolución de los datos.
          return res.status(200).json({
            data: user,
            accessToken: token,
            keepMeIn: req.body.keepMeIn ? 'true' : 'false',
            tokenKeep: tokenKeep ? tokenKeep : 'false',
          })

        } else {
          return res.status(400).json({
            error: "Invalid password",
            message: "Contraseña incorrecta"
          })
        }

      } else {
        return res.status(404).json({
          error: 'User not found',
          message: 'Usuario no encontrado.'
        })
      }
    } else {
      return res.status(400).json({
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
          return res.status(201).json({
            message: "Actualizado correctamente.",
            data: data
          })
        })
      } else {
        return res.status(400).json({
          error: "User already exists",
          message: "Ya existe un usuario con esta dirección de email."
        })
      }

    } else {
      return res.status(400).json({
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
            return res.status(400).json({
              errors:{
                clave: {
                  msg: 'La contraseña es incorrecta.'
                }
              }
            })
          }
        } else {
          return res.status(404).json({
            message: 'Usuario no encontrado.'
          })
        }
      } catch (err) {
        return res.status(500).json({
          message: err.message,
          serverMessage: 'Hubo un error en la base de datos al verificar la contraseña del usuario.',
          error: err
        })
      }
    } else {
      return res.status(400).json({
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
            return res.status(201).json({
              message: 'Usuario eliminado correctamente.'
            })
          })
        } else {
          return res.status(404).json({
            error: 'User not found',
            message: 'Usuario no encontrado.'
          })
        }
      } catch (err) {
        console.error(err)
        return res.status(500).json({
          err: err,
          errMessage: err.message,
          message: 'Hubo un error en la base de datos.'
        })
      }
    } else {
      return res.status(400).json({
        error: 'Empty fields.',
        message: errors.mapped()
      })
    }
  }
}
export default controller;