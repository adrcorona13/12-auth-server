
const crearUsuario = (req, res) => {
    return res.json({
        ok: true,
        msg: 'Crear usuario /new'
    })
}

const loginUsuario = (req, res) => {
    return res.json({
        ok: true,
        msg: 'Login de usuario /'
    })
}

const renovarToken = (req, res) => {
    return res.json({
        ok: true,
        msg: 'Renovar JWT /renew'
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
}