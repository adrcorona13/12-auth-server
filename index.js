const express = require("express");

// Crear el servidor/app de express
const app = express();

// GET

app.get('/', (req, resp) => {
    // resp.status(500) => cambiar status de la peticion
    resp.status(500).json({
        ok: true,
        msg: 'Todo salio bien',
        uid: 123
    });
})

app.listen(4000, () => {
    console.log(`Servidor corriendo en puerto ${4000}`);

});
