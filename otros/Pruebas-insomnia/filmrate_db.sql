-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-06-2025 a las 05:09:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `filmrate_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `usuarioRut` varchar(255) NOT NULL,
  `peliculaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`usuarioRut`, `peliculaId`) VALUES
('21313490-k', 157336),
('21313490-k', 1442776),
('214556165-k', 359724),
('214556165-k', 419704),
('214556165-k', 1311844),
('21490313-j', 27205);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `like_resenas`
--

CREATE TABLE `like_resenas` (
  `usuarioRut` varchar(255) NOT NULL,
  `resenaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `like_resenas`
--

INSERT INTO `like_resenas` (`usuarioRut`, `resenaId`) VALUES
('214556165-k', 4),
('214556165-k', 8),
('214556165-k', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`id`, `titulo`) VALUES
(27205, 'Origen'),
(157336, 'Interstellar'),
(359724, 'Le Mans \'66'),
(419704, 'Ad astra'),
(552524, 'Lilo y Stitch'),
(605722, 'Distant'),
(911430, 'F1 la película'),
(950387, 'Una película de Minecraft'),
(1181039, 'La tumba del rey maldito'),
(1311844, 'The Twisters'),
(1426776, 'Harta'),
(1442776, 'Guerra de mutantes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resenas`
--

CREATE TABLE `resenas` (
  `id` int(11) NOT NULL,
  `peliculaId` int(11) NOT NULL,
  `texto` text NOT NULL,
  `valoracion` int(11) NOT NULL,
  `usuarioRut` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resenas`
--

INSERT INTO `resenas` (`id`, `peliculaId`, `texto`, `valoracion`, `usuarioRut`, `createdAt`, `updatedAt`) VALUES
(4, 605722, 'Ni tan buena para 5 estrellas ni tan mala para 1 estrella ( 5 estrellas es Dune , 1 estrella es Emilia Perez) , en mi opinión el principal problema de esta película es la actuación de Anthony Ramos, exagerada y comedia forzada que no encaja con el resto, lo bueno son los efectos los cuales no cantan en ningún momento, eso si la historia se siente muy atropellada sin el suficiente desarrollo, agujeros en la trama donde no se explican muchas cosas, no la recomendaría pero tampoco diría que es una perdida de tiempo, creo que pasa con nota justa.', 3, '21313490-k', '2025-06-23 02:43:44', '2025-06-23 02:43:44'),
(7, 1311844, 'Buena pelicula para perder el tiempo', 5, '214556165-k', '2025-06-23 03:04:22', '2025-06-23 03:04:22'),
(8, 359724, 'Quería que Miles ganara la carrera.... Maldito tecnicismo, xD\nBueno, ya hablando en serio. Fue una maravillosa obra. \nLo disfruté por primera vez en época de la pandemia y esta fue una de las razones que el tiempo de aislamiento total no fuera tediosa.\nEn general, la habré visto como 3 ocasiones a la hora de dejar mi reseña.\nBien... Hablando más a fondo de la película 🎥, todo estuvo bueno: la ambientación de época, la historia, los actores y por sobre todo, las carreras y como los planos se enfocaban en los autos (he aprendido la razón del porqué a ese modelo británico estadounidense se le acuñó como nombre GT40 para el modelo prototipo con el que se tenía pensado hacer frente a Ferrari)\nDefinitivamente, una de las mejores películas que el 2019 nos regaló y mi calificación es definitivamente un 10.', 5, '214556165-k', '2025-06-23 03:05:01', '2025-06-23 03:05:01'),
(9, 419704, 'Muy buena película sin duda alguna es mi película favorita aparte de que me gusta mucho las películas \"espaciales\" me sentí muy identificado con el protagonista. Tiene un mensaje profundo, la ambientación es muy buena silenciosa, serena, tranquila y solitaria. \n\n\nLa película tiene un buen ritmo que va a acorde con el ambiente (el espacio) sin ruidos fuertes ni explosiones ruidosas tal y como debe de ser ya que en el espacio no hay ruido.\n\n\nEl papel del personaje es bueno, solitario, depresivo, tranquilo, sereno, confundido y con una gran angustia de que paso con su padre. \n\n\nEl actor hizo muy bien su papel se metió en el ambiente supo cómo hacerlo exactamente, serio y solitario, etc.\n\n\nTiene una buena drama, hay escenas en las que te pone un poco tenso, es interesante y entre más las estás viendo más te envuelve en esa sensación solo tu y la película.\n\n\nLa historia buena, un hijo que está confundido, depresivo, solitario quiere saber que paso con su padre y el proyecto, le piden hacer una mision el la acepta se termina colando en una nave espacial, mata a toda una tripulación y se dirige rumbo a su padre, en ese viaje, en ese trayecto el personaje se pone reflexivo todo es tranquilo, solitario y silencioso. Llega donde su padre, el padre se suicida flotando en el vacío del espacio el hijo destruye el proyecto (artefacto) que estaba causando los problemas en todo el sistema solar al final el hijo vuelve a la tierra esperando a su ex ya que se da cuenta de que ella es la única persona que de algún modo lo hacía sentir feliz.\n\n\nEn fin muy buena película sin duda alguna 5 estrellas, la gente que da malas opiniones es por qué es muy depresiva la película pero eso no le quita el hecho de ser buena, en fin muy buena recomendada 100%.', 5, '214556165-k', '2025-06-23 03:05:45', '2025-06-23 03:05:45'),
(10, 950387, 'No me gusto la pelicula', 1, '214556165-k', '2025-06-23 03:06:34', '2025-06-23 03:06:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguidores`
--

CREATE TABLE `seguidores` (
  `seguidorRut` varchar(255) NOT NULL,
  `seguidoRut` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `seguidores`
--

INSERT INTO `seguidores` (`seguidorRut`, `seguidoRut`) VALUES
('214556165-k', '21313490-k');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `rut` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `comuna` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fotoPerfil` varchar(255) DEFAULT NULL,
  `esModerador` tinyint(1) NOT NULL DEFAULT 0,
  `suspendido` tinyint(1) NOT NULL DEFAULT 0,
  `intentosFallidos` int(11) NOT NULL DEFAULT 0,
  `bloqueadoHasta` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`rut`, `nombre`, `correo`, `region`, `comuna`, `contrasena`, `descripcion`, `fotoPerfil`, `esModerador`, `suspendido`, `intentosFallidos`, `bloqueadoHasta`) VALUES
('21313490-k', 'test1', 'test1@gmail.com', 'Arica y Parinacota', 'Putre', '$2b$10$Oh6omXKgqkB48nk8kLM7wey8JAu6frNgZRU61A5uhcUGKA4H.v3NG', NULL, NULL, 0, 1, 0, '2025-06-23 03:04:00'),
('214556165-k', 'Dmarcan', 'David.martinez@gmail.com', 'Antofagasta', 'Ollagüe', '$2b$10$IVUsrJXi51qXlefIsN5EUOG6pGpn3Deog9M2weaL2qL4sJIWnCl3G', 'Soy una persona que le gusta mucho las peliculas de suspenso y series de ciencia ficcion', NULL, 0, 0, 0, NULL),
('21490313-j', 'moderador', 'moderador1@gmail.com', 'Arica y Parinacota', 'Arica', '$2b$10$jGU/QGWgim0fyOrDSuxoFu/Ny6svYhGodu7NCvhuJnwKYwshtT4r.', NULL, NULL, 1, 0, 0, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`usuarioRut`,`peliculaId`),
  ADD UNIQUE KEY `favoritos_peliculaId_usuarioRut_unique` (`usuarioRut`,`peliculaId`),
  ADD KEY `peliculaId` (`peliculaId`);

--
-- Indices de la tabla `like_resenas`
--
ALTER TABLE `like_resenas`
  ADD PRIMARY KEY (`usuarioRut`,`resenaId`),
  ADD UNIQUE KEY `like_resenas_resenaId_usuarioRut_unique` (`usuarioRut`,`resenaId`),
  ADD KEY `resenaId` (`resenaId`);

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `resenas`
--
ALTER TABLE `resenas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `peliculaId` (`peliculaId`),
  ADD KEY `usuarioRut` (`usuarioRut`);

--
-- Indices de la tabla `seguidores`
--
ALTER TABLE `seguidores`
  ADD PRIMARY KEY (`seguidorRut`,`seguidoRut`),
  ADD UNIQUE KEY `Seguidores_seguidoRut_seguidorRut_unique` (`seguidorRut`,`seguidoRut`),
  ADD KEY `seguidoRut` (`seguidoRut`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`rut`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `nombre_2` (`nombre`),
  ADD UNIQUE KEY `correo_2` (`correo`),
  ADD UNIQUE KEY `nombre_3` (`nombre`),
  ADD UNIQUE KEY `correo_3` (`correo`),
  ADD UNIQUE KEY `nombre_4` (`nombre`),
  ADD UNIQUE KEY `correo_4` (`correo`),
  ADD UNIQUE KEY `nombre_5` (`nombre`),
  ADD UNIQUE KEY `correo_5` (`correo`),
  ADD UNIQUE KEY `nombre_6` (`nombre`),
  ADD UNIQUE KEY `correo_6` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `resenas`
--
ALTER TABLE `resenas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`usuarioRut`) REFERENCES `usuarios` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`peliculaId`) REFERENCES `peliculas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `like_resenas`
--
ALTER TABLE `like_resenas`
  ADD CONSTRAINT `like_resenas_ibfk_1` FOREIGN KEY (`usuarioRut`) REFERENCES `usuarios` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `like_resenas_ibfk_2` FOREIGN KEY (`resenaId`) REFERENCES `resenas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `resenas`
--
ALTER TABLE `resenas`
  ADD CONSTRAINT `resenas_ibfk_1` FOREIGN KEY (`peliculaId`) REFERENCES `peliculas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `resenas_ibfk_10` FOREIGN KEY (`usuarioRut`) REFERENCES `usuarios` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `resenas_ibfk_11` FOREIGN KEY (`peliculaId`) REFERENCES `peliculas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `resenas_ibfk_12` FOREIGN KEY (`usuarioRut`) REFERENCES `usuarios` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `resenas_ibfk_2` FOREIGN KEY (`usuarioRut`) REFERENCES `usuarios` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `resenas_ibfk_3` FOREIGN KEY (`peliculaId`) REFERENCES `peliculas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `resenas_ibfk_4` FOREIGN KEY (`usuarioRut`) REFERENCES `usuarios` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `resenas_ibfk_5` FOREIGN KEY (`peliculaId`) REFERENCES `peliculas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `resenas_ibfk_6` FOREIGN KEY (`usuarioRut`) REFERENCES `usuarios` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `resenas_ibfk_7` FOREIGN KEY (`peliculaId`) REFERENCES `peliculas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `resenas_ibfk_8` FOREIGN KEY (`usuarioRut`) REFERENCES `usuarios` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `resenas_ibfk_9` FOREIGN KEY (`peliculaId`) REFERENCES `peliculas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `seguidores`
--
ALTER TABLE `seguidores`
  ADD CONSTRAINT `seguidores_ibfk_1` FOREIGN KEY (`seguidorRut`) REFERENCES `usuarios` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `seguidores_ibfk_2` FOREIGN KEY (`seguidoRut`) REFERENCES `usuarios` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
