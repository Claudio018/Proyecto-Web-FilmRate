const express = require('express');
const router = express.Router();
const { Favorito, Pelicula } = require('../models');
const authenticateToken = require('../middleware/authenticateToken');

// Marcar o desmarcar favorito
router.post('/:peliculaId', authenticateToken, async (req, res) => {
  try {
    const peliculaId = req.params.peliculaId;
    const usuarioRut = req.user.rut;
    const { titulo } = req.body; // Recibe el título en el body

    // Verificar si la película existe, si no la crea con el título recibido
    await Pelicula.findOrCreate({
      where: { id: peliculaId },
      defaults: { titulo: titulo || 'Película sin título' }
    });

    const favoritoExistente = await Favorito.findOne({
      where: { peliculaId, usuarioRut }
    });

    if (favoritoExistente) {
      await favoritoExistente.destroy();
      return res.json({ mensaje: 'Favorito eliminado' });
    } else {
      await Favorito.create({ peliculaId, usuarioRut });
      return res.json({ mensaje: 'Favorito creado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar favorito' });
  }
});

// Ver si es favorito
router.get('/:peliculaId', authenticateToken, async (req, res) => {
  try {
    const peliculaId = req.params.peliculaId;
    const usuarioRut = req.user.rut;

    const favorito = await Favorito.findOne({
      where: { peliculaId, usuarioRut }
    });

    const esFavorito = !!favorito;

    res.json({ esFavorito });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener favorito' });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const usuarioRut = req.user.rut;

    // Busca todos los favoritos del usuario, solo los IDs de películas
    const favoritos = await Favorito.findAll({
      where: { usuarioRut },
      attributes: ['peliculaId']
    });

    // Extraemos los ids
    const peliculasFavoritasIds = favoritos.map(fav => fav.peliculaId);

    res.json({ peliculasFavoritasIds });
  } catch (error) {
    console.error('Error obteniendo favoritos:', error);
    res.status(500).json({ error: 'Error al obtener favoritos' });
  }
});

module.exports = router;
