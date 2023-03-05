const express = require('express');
const cors = require('cors')

// Crear el servidor/app de express
const app = express();


// BEGIN: Middleware

// Cors
app.use(cors());

// Rutas
app.use("/api/auth", require('./routes/auth.routes'));

// END: Middleware

app.listen(4000, () => {
  console.log(`Servidor corriendo en puerto ${4000}`);
});
