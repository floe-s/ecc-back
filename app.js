import express from "express";
const app = express();

import session from 'express-session';
import cors from 'cors';
import path from "path";
import methodOverride from 'method-override';
// ROUTES REQUIRES
import mainRoute from "./src/routes/mainRoute.js";
import productRoute from "./src/routes/productRoute.js";
import userRoute from "./src/routes/userRoute.js";


// CONFIGS
app.set('trust proxy', true); // CONFIGURACIÓN ESPECIAL PARA VERCEL -> PERMITE EL TRANSPORTE DE COOKIES.
// Cors => Para permitir peticiones desde los navegadores.
app.use(cors())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})


// Configuración de la cookie "session" adaptada al transporte de cookies a través de HTTPS. 
app.use(session({
  secret:'session_secret',
  resave: false,
  saveUninitialized: false,
  name:'session',
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // secure: true sólo cuando se utiliza HTTPS, si se utiliza HTTP se debe cambiar a false.
    sameSite: 'none'
  }
}))

// Permitir la transferencia de información a través del body.
app.use(express.urlencoded({ 
  extended: false
}))
app.use(express.json());
app.use(methodOverride('_method'))
// ROUTES
app.use("/", mainRoute);

app.use("/product", productRoute);

app.use("/user", userRoute);

app.listen(3000, () => console.log("Servidor corriendo \nLink: http://localhost:3000/"));