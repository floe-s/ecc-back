const express = require("express");
const router = express.Router();

const controller = require("../controllers/productController");

router.get('/products', controller.product);
/* router.get('/products:id', (req, res) {}); Rutas parametrizadas o dinámicas */

module.exports = router;
