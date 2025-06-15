const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');
const authenticateToken = require('../middleware/authenticateToken');
const verifyModerator = require('../middleware/verifyModerator');

// Suspender usuario (RF-10)
router.put('/usuarios/:rut/suspender', authenticateToken, verifyModerator, async (req, res) => {
  try {
    const { rut } = req.params;
    const usuario = await Usuario.findByPk(rut);

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    usuario.suspendido = true;
    await usuario.save();

    res.json({ mensaje: 'Usuario suspendido correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Quitar suspensión a usuario (RF-10-b)
router.put('/usuarios/:rut/quitar-suspension', authenticateToken, verifyModerator, async (req, res) => {
  try {
    const { rut } = req.params;
    const usuario = await Usuario.findByPk(rut);

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    usuario.suspendido = false;
    await usuario.save();

    res.json({ mensaje: 'Suspensión removida correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Borrar usuario (RF-11)
router.delete('/usuarios/:rut', authenticateToken, verifyModerator, async (req, res) => {
  try {
    const { rut } = req.params;
    const usuario = await Usuario.findByPk(rut);

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    await usuario.destroy();

    res.json({ mensaje: 'Usuario borrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
