const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const { UniqueConstraintError } = require('sequelize');


const router = express.Router();

//post para registrarse
router.post('/register', async (req, res) => {
  const { nombre, rut, correo, region, comuna, contrasena } = req.body;

  console.log('Datos recibidos para registro:', req.body);

  if (!nombre || !rut || !correo || !region || !comuna || !contrasena) {
    return res.status(400).json({ error: 'Faltan campos requeridos para el registro' });
  }

  try {
    //verificacion si ya existe el usuario
    const usuarioExistente = await Usuario.findOne({ where: { nombre } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso.' });
    }
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    console.log('Password hasheada:', hashedPassword);

    const nuevoUsuario = await Usuario.create({
      nombre,
      rut,
      correo,
      region,
      comuna,
      contrasena: hashedPassword
    });
    


    console.log('Usuario creado:', nuevoUsuario);

    res.status(201).json({ mensaje: `Usuario ${nuevoUsuario.nombre} registrado correctamente` });
  } catch (error) {
    console.error('Error en register:', error);

    if (error instanceof UniqueConstraintError) {
      const campoDuplicado = error.errors[0].path;

      let mensaje = 'Ya existe un registro con esos datos.';
      if (campoDuplicado === 'correo') mensaje = 'El correo ya está registrado.';
      else if (campoDuplicado === 'rut') mensaje = 'El RUT ya está registrado.';
      else if (campoDuplicado === 'nombre') mensaje = 'El nombre de usuario ya está en uso.';

      return res.status(400).json({ error: mensaje });
    }

    res.status(500).json({ error: 'Error al registrar usuario', detalle: error.message });
  }
});

//post para login
router.post('/login', async (req, res) => {
  const { nombre, contrasena } = req.body;

  console.log('Datos recibidos para login:', req.body);

  if (!nombre || !contrasena) {
    return res.status(400).json({ error: 'Nombre y contraseña son requeridos para login' });
  }

  try {
    // Buscar usuario por nombre 
    const usuario = await Usuario.findOne({ where: { nombre } });

    if (!usuario) {
      console.log('Usuario no encontrado con nombre:', nombre);
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!validPassword) {
      console.log('Contraseña incorrecta para usuario:', nombre);
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    if (usuario.suspendido) {
      return res.status(403).json({ error: 'Tu cuenta está suspendida' });
    }
    // Generar token con id y nombre
    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, rut: usuario.rut, esModerador: usuario.esModerador  },
      process.env.JWT_SECRET,
      { expiresIn: '30m' }
    );

    console.log('Login exitoso para usuario:', nombre);

    res.json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el login', detalle: error.message });
  }
});

module.exports = router;
