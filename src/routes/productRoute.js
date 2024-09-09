import express from "express";
const router = express.Router();

import controller from "../services/productServices.js";

router.get('/products', controller.product);
/* router.get('/products:id', (req, res) {}); Rutas parametrizadas o dinámicas */

export default router;
