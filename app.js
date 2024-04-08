const express = require("express");
const app = express();
const cors = require('cors');
const path = require("path");
const methodOverride = require('method-override')
// ROUTES REQUIRES
const mainRoute = require("./src/routes/mainRoute");
const productRoute = require("./src/routes/productRoute");
const userRoute = require("./src/routes/userRoute");


// CONFIGS

// Cors => Para permitir peticiones desde los navegadores.
app.use(cors())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

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