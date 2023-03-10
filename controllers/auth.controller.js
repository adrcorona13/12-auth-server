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

  const token = await generarJWT(dbUser.id, name, email);

  // Crear usuario en BD
  await dbUser.save();

  // Generar confirmación

  return res.status(200).json({
    ok: true,
    uid: dbUser.id,
    name,
    email,
    token
  });
};

const loginUsuario = async (req, res = response) => {
  console.log('Login');
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

    const token = await generarJWT(dbUser.id, dbUser.name, dbUser.email);

    return res.json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      token
    });  

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Ocurrió un error",
      error
    });
  }
};

const renovarToken = async (req, res) => {
  console.log('token');
  const {uid} = req;

  const dbUser = await Usuario.findById(uid);

  const token = await generarJWT(uid, dbUser.name, dbUser.email);

  return res.json({
    ok: true,
    uid, 
    name: dbUser.name, 
    email: dbUser.email,
    token
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  renovarToken,
};
