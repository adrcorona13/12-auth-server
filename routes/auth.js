const { Router } = require('express');

const router = Router();

// Crear un nuevo usuario
router.post('/new', (req, res) => {
    return res.json({
        ok: true,
        msg: 'Crear usuario /new'
    })
})

// Login de usuario
router.post('/', (req, res) => {
    return res.json({
        ok: true,
        msg: 'Login de usuario /'
    })
})

// Validar/Revalidar JWT
router.get('/renew', (req, res) => {
    return res.json({
        ok: true,
        msg: 'Renovar JWT /renew'
    })
})

module.exports = router;