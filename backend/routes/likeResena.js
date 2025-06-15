const express = require('express');
const router = express.Router();
const { LikeResena } = require('../models');
const authenticateToken = require('../middleware/authenticateToken');

// POST dar like
router.post('/:resenaId', authenticateToken, async (req, res) => {
  const usuarioRut = req.user.rut;
  const { resenaId } = req.params;

  try {
    const existing = await LikeResena.findOne({ where: { resenaId, usuarioRut } });
    if (existing) {
      return res.status(400).json({ error: 'Ya diste like' });
    }

    await LikeResena.create({ resenaId, usuarioRut });
    const likesCount = await LikeResena.count({ where: { resenaId } });

    res.status(201).json({ liked: true, likesCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al dar like' });
  }
});

// DELETE quitar like
router.delete('/:resenaId', authenticateToken, async (req, res) => {
  const usuarioRut = req.user.rut;
  const { resenaId } = req.params;

  try {
    const deleted = await LikeResena.destroy({ where: { resenaId, usuarioRut } });
    if (!deleted) return res.status(404).json({ error: 'Like no encontrado' });

    const likesCount = await LikeResena.count({ where: { resenaId } });
    res.json({ liked: false, likesCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al quitar like' });
  }
});

// GET info likes (requiere autenticación)
router.get('/:resenaId', authenticateToken, async (req, res) => {
  const usuarioRut = req.user.rut;
  const { resenaId } = req.params;

  try {
    const likesCount = await LikeResena.count({ where: { resenaId } });
    const liked = (await LikeResena.findOne({ where: { resenaId, usuarioRut } })) != null;
    res.json({ liked, likesCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener info de likes' });
  }
});

// GET público para contar likes sin autenticación
router.get('/public/:resenaId', async (req, res) => {
  const { resenaId } = req.params;

  try {
    const likesCount = await LikeResena.count({ where: { resenaId } });
    res.json({ likesCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el conteo de likes' });
  }
});

module.exports = router;
