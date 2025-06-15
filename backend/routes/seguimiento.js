const express = require('express');
const router = express.Router();
const { Seguidor } = require('../models');
const authenticateToken = require('../middleware/authenticateToken');

// Ver si un usuario sigue a otro
router.get('/:rut/seguido/:seguidoRut', authenticateToken, async (req, res) => {
  const { rut, seguidoRut } = req.params;
  const sigue = await Seguidor.findOne({ where: { seguidorRut: rut, seguidoRut } });
  res.json({ sigue: !!sigue });
});

// Seguir a otro
router.post('/:rut/seguir/:seguidoRut', authenticateToken, async (req, res) => {
  if (req.params.rut === req.params.seguidoRut) {
    return res.status(400).json({ error: 'No puedes seguirte a ti mismo' });
  }

  await Seguidor.findOrCreate({
    where: { seguidorRut: req.params.rut, seguidoRut: req.params.seguidoRut }
  });

  res.json({ seguido: true });
});

// Dejar de seguir
router.delete('/:rut/dejar/:seguidoRut', authenticateToken, async (req, res) => {
  await Seguidor.destroy({
    where: { seguidorRut: req.params.rut, seguidoRut: req.params.seguidoRut }
  });

  res.json({ seguido: false });
});

module.exports = router;
