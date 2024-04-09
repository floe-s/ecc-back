const express = require("express");
const router = express.Router();
const validations = require('../middlewares/validations.js');
const controller = require('../controllers/userController');

// GET REQUESTS
router.get('/users', controller.user);

// POST REQUESTS
router.post('/create', validations.userCreate, controller.userCreate);
router.post('/login', validations.userLoginProcess, controller.userLoginProcess);

// UPDATE REQUESTS
router.put('/selfUpdate', validations.userSelfUpdate, controller.userSelfUpdate);

module.exports = router;