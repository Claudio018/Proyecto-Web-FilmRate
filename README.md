# Proyecto Web ICI4247-1: FilmRate 
FilmRate es una plataforma web donde los usuarios pueden descubrir, reseñar y calificar películas. La plataforma permite buscar títulos específicos, leer reseñas escritas por otros usuarios, ver tráilers, asignar puntuaciones mediante un sistema de estrellas y recibir recomendaciones personalizadas basadas en sus preferencias cinematográficas. Además, brinda la posibilidad de llevar un registro de las películas que han sido marcadas como favoritas, otorgando una experiencia personalizada y completa para los amantes del cine

# Roles del sistema
El sistema cuenta con los siguientes roles:
    1. Usuario: Aquel que navega por la aplicación e interactúa con las películas
    2. Administrador: Posee la facultad de agregar películas, junto a descripciones

# RF (Requerimientos funcionales)

- RF-1 El usuario puede escribir reseñas en las películas
- RF-2 El usuario puede buscar películas por el nombre
- RF-3 El usuario puede puntuar películas con estrellas
- RF-4 El administrador puede agregar una película nueva al sistema 
- RF-5 El usuario puede añadir películas a su lista de favoritos
- RF-6 El moderador puede suprimir reseñas o comentarios que hayan sido reportados
- RF-7 El moderador puede suspender o borrar la cuenta de un usuario que haya roto las reglas
- RF-8 El usuario puede visualizar el perfil de otros usuarios
- RF-9 El usuario puede crear una cuenta o iniciar sesión

# RNF (Requerimientos no funcionales)
- RNF-1 La interfaz debe ser intuitiva y fácil de usar, permitiendo que un usuario comprenda cómo navegar, buscar películas y publicar reseñas
- RNF-2 Los datos de los usuarios deben ser íntegros conforme a criterios de seguridad de cifrado 
- RNF-3 Tras 5 intentos fallidos de inicio de sesión, bloquear el acceso durante 15 minutos 
- RNF-4 La sesión de usuario expirará después de 30 minutos de inactividad para reforzar la seguridad
- RNF-5 Realizar copias de seguridad automáticas de la base de datos cada 24 horas
- RNF‑6 El sistema soporta los navegadores web modernos tales como brave, opera, entre otros.
- RNF‑7 El sistema deberá garantizar una disponibilidad del servicio de al menos 90 % mensual

# Tecnologías usadas
Las tecnologías utilizadas para el desarrollo del proyecto son:
- Angular
- Ionic
- HTML
- SCSS
- TypeScript
- SQL

# Bocetos de UI/UX & Mockups

Para acceder a los bocetos de bocetos de UI/UX y mockups en figma, mediante el siguiente enlace:
https://www.figma.com/design/feXFruDuZVtEtykDEP3pPj/Proyecto-Web-Peliculas?m=auto&t=II66iO54mg2MD9AT-1

Nota: El figma cuenta con dos versiones en la sección 'Pages', con nombre de las páginas: 'Mobile version' y 'Desktop version'. Las páginas hacen referencias al prototipo para las versiones de dispositivos móviles y de escritorio

# Experiencia de usuario
La experiencia de usuario se enfoca en la simplicidad, íconos reconocibles (corazón, lupa) y formularios con campos bien espaciados. Cada acción relevante como agregar a favoritos o escribir una reseña, está accesible con pocos toques, y los elementos como calificaciones con estrellas o botones de reproducción de video aportan interactividad de manera rápida

En la versión web, la navegación se organiza con un header fijo que permite moverse entre inicio, favoritos, perfil y acciones administrativas según el rol del usuario. Las vistas están claramente separadas: inicio de sesión, registro, visualización de películas, creación y lectura de reseñas, y favoritos
