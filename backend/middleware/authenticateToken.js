const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const authenticateToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido o expirado' });

    // Buscar usuario completo para validar suspendido
    const usuarioDB = await Usuario.findByPk(user.rut);
    if (!usuarioDB) return res.status(404).json({ error: 'Usuario no encontrado' });

    if (usuarioDB.suspendido) return res.status(403).json({ error: 'Cuenta suspendida' });

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
