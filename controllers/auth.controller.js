
const crearUsuario = (req, res) => {

    const { name, email, password } = req.body;

    console.log( name, email, password );

    return res.json({
        ok: true,
        msg: 'Crear usuario /new'
    })
}

const loginUsuario = (req, res) => {

    const { email, password} = req.body;

    console.log(email, password);

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