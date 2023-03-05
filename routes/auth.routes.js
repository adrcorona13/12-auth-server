const { Router } = require('express');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth.controller');

const router = Router();

// Crear un nuevo usuario
router.post('/new', crearUsuario)

// Login de usuario
router.post('/', loginUsuario)

// Validar/Revalidar JWT
router.get('/renew', renovarToken)

module.exports = router;