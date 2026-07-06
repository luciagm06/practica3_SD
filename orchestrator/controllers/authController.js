'use strict';

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'clave-secreta-practica3-cambiar-en-produccion';

// Usuario "hardcodeado" para la práctica (documentar en la memoria)
const AUTH_USER = process.env.AUTH_USER || 'admin';
const AUTH_PASSWORD = process.env.AUTH_PASSWORD || 'practica3';

function login(req, res) {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({
      error: 'Bad request',
      message: 'user y password son obligatorios'
    });
  }

  if (user !== AUTH_USER || password !== AUTH_PASSWORD) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Usuario o contraseña incorrectos'
    });
  }

  const token = jwt.sign(
    { user: user },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  console.log('[AUTH] Login correcto para usuario:', user);

  res.status(200).json({
    token: token,
    expiresIn: '1h'
  });
}

module.exports = {
  login
};