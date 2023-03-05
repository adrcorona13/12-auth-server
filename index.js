const express = require("express");
const cors = require("cors");
require('dotenv').config();

console.log(process.env);

// Crear el servidor/app de express
const app = express();

// BEGIN: Middleware

// Cors
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth.routes"));

// END: Middleware

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
