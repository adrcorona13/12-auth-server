const express = require("express");
const cors = require("cors");
const path = require("path");
const { dbConnection } = require("./db/config");
require('dotenv').config();

// Crear el servidor/app de express
const app = express();

// Conexion a la BD
dbConnection()


// BEGIN: Middleware

// Directorio público
app.use(express.static('public'))

// Cors
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth.routes"));

// Manejar demás rutas

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
});

// END: Middleware

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
