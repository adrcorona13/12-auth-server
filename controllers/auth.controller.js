const Usuario = require('../models/UsuarioModel')
const bcrypt = require('bcryptjs')

const crearUsuario = async (req, res) => {
  const { email, name, password } = req.body;

  try {

      // Verificar si el correo existe
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
        return res.status(400).json({
            ok: false,
            msg: 'El correo ya esta en uso.'
        })
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
        ok: false,
        msg: 'Ocurrió un error inesperado'
    })
  }

  // Crear usuario con el modelo
  const dbUser = new Usuario(req.body);

  // Hash password
  const salt = bcrypt.genSaltSync();
  dbUser.password = bcrypt.hashSync(password, salt);

  // Generar JWT

  // Crear usuario en BD
  await dbUser.save();

  // Generar confirmación

  return res.status(200).json({
    ok: true,
    uid: dbUser.id,
    name
  });
};

const loginUsuario = (req, res = response) => {
  return res.json({
    ok: true,
    msg: "Login de usuario /",
  });
};

const renovarToken = (req, res) => {
  return res.json({
    ok: true,
    msg: "Renovar JWT /renew",
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  renovarToken,
};
