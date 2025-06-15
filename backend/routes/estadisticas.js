const express = require('express');
const router = express.Router({ mergeParams: true }); 
const { Favorito, Resena, Seguidor, LikeResena } = require('../models');

router.get('/', async (req, res) => {
  try {
    const { rut } = req.params;

    // Cantidad favoritos (tabla Favorito)
    const cantidadFavoritos = await Favorito.count({ where: { usuarioRut: rut } });

    // Cantidad reseñas hechas (tabla Resena)
    const cantidadResenas = await Resena.count({ where: { usuarioRut: rut } });

    // Cantidad likes dados (tabla LikeResena)
    const cantidadLikesDado = await LikeResena.count({ where: { usuarioRut: rut } });

    // Cantidad seguidores (tabla Seguidor, campo seguidoRut = rut)
    const cantidadSeguidores = await Seguidor.count({ where: { seguidoRut: rut } });

    // Cantidad siguiendo (tabla Seguidor, campo seguidorRut = rut)
    const cantidadSiguiendo = await Seguidor.count({ where: { seguidorRut: rut } });

    res.json({
      cantidadFavoritos,
      cantidadResenas,
      cantidadLikesDado,
      cantidadSeguidores,
      cantidadSiguiendo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
