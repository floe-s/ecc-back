/* let fs = require("fs");  */
/* let moment = require("moment");  */
const express = require("express");
const app = express();

const mainRoute = require('./src/routes/mainRoute');
const productRoute = require('./src/routes/productRoute');
const userRoute = require('./src/routes/userRoute');

/* app.listen(process.env.PORT || 3002, function() {
  console.log("Servidor corriendo en el puerto 3002");
}); */

const path = require("path");

app.listen(3000, () => console.log("Servidor corriendo "));

/* app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
}); */

app.use('/', mainRoute);

app.use('/producto', productRoute);

app.use('/usuario', userRoute);