import express from "express";
const router = express.Router();
import validations from '../middlewares/validations.js';
import controller from '../services/userServices.js';

// GET REQUESTS
router.get('/users', controller.user);

// POST REQUESTS
router.post('/create', validations.userCreate, controller.userCreate);
router.post('/login', validations.userLoginProcess, controller.userLoginProcess);

// UPDATE REQUESTS
router.put('/selfUpdate', validations.userSelfUpdate, controller.userSelfUpdate);
router.put('/updatePassword', validations.userSelfUpdatePassword, controller.userSelfUpdatePassword) //Esta función debe recibir un id, una clave y una newClave para funcionar correctamente.

export default router;