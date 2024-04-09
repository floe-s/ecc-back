const express = require("express");
const router = express.Router();
const validations = require('../middlewares/validations.js');
const controller = require('../controllers/userController');


router.get('/users', controller.user);
router.post('/create', validations.userCreate, controller.userCreate);
router.post('/login', validations.userLoginProcess, controller.userLoginProcess);


module.exports = router;