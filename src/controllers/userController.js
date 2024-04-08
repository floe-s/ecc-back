const db = require('../database/models')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

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

        if (!userExists) { 
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
  }
};

module.exports = controller;