const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const rut = req.user.rut;

    const usuario = await Usuario.findOne({
      where: { rut },
      attributes: ['nombre', 'correo', 'region', 'comuna']
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error al obtener datos del usuario' });
  }
});

module.exports = router;
