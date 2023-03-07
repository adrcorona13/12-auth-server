const { Router } = require('express');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth.controller');
const { check } = require('express-validator');

const router = Router();

// Crear un nuevo usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 6}),
],crearUsuario)

// Login de usuario
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 6}),
], loginUsuario)

// Validar/Revalidar JWT
router.get('/renew', renovarToken)

module.exports = router;