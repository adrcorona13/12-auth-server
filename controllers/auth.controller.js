const Usuario = require('../models/UsuarioModel')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt.helper')

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

  const token = await generarJWT(dbUser.id, name);

  // Crear usuario en BD
  await dbUser.save();

  // Generar confirmación

  return res.status(200).json({
    ok: true,
    uid: dbUser.id,
    name,
    token
  });
};

const loginUsuario = async (req, res = response) => {

  const {email, password} = req.body;

  try {
    const dbUser = await Usuario.findOne({ email });
    
    if (!dbUser) {
      return res.status(500).json({
        ok: false,
        msg: "El correo no existe",
      });  
    }
    
    const validPassword = bcrypt.compareSync( password, dbUser.password);
    
    if (!validPassword) {
      return res.status(500).json({
        ok: false,
        msg: "El password es incorrecto",
      });  
    }

    const token = await generarJWT(dbUser.id, dbUser.name);

    return res.json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      token
    });  

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Ocurrió un error",
    });
  }
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
