import express from "express";
const router = express.Router();

import controller from "../services/mainServices.js";

router.get('/', controller.index);

export default router;
