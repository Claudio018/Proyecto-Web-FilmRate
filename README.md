# Proyecto Web ICI4247-1: FilmRate 
FilmRate es una plataforma web donde los usuarios pueden descubrir, reseñar y calificar películas. La plataforma permite buscar títulos específicos, leer reseñas escritas por otros usuarios, ver tráilers y asignar puntuaciones mediante un sistema de estrellas. Además, brinda la posibilidad de llevar un registro de las películas que han sido marcadas como favoritas, otorgando una experiencia personalizada y completa para los amantes del cine


# Roles del Sistema

El sistema cuenta con los siguientes roles:

1. **Usuario**: Aquel que navega por la aplicación e interactúa con las películas.

2. **Moderador**: Posee la facultad de borrar cuentas y cambiar contraseña de las cuentas.
  


# RF (Requerimientos Funcionales)

- RF-1 El usuario puede escribir reseñas en las películas
- RF-2 El usuario puede buscar películas por el nombre
- RF-3 El usuario puede puntuar películas con estrellas
- RF-4 El usuario puede publicar una reseñas de las películas
- RF-5 El usuario puede visualizar el perfil de otros usuarios
- RF-6 El usuario puede crear una cuenta
- RF-7 El usuario puede iniciar sesión
- RF-8 El usuario puede añadir películas a su lista de favoritos
- RF-9 El usuario puede dar me gusta a las reseñas publicadas
- RF-10 El moderador puede suspender la cuenta de un usuario
- RF-11 El moderador puede borrar la cuenta de un usuario


# RNF (Requerimientos No Funcionales)
- RNF-1 La interfaz debe ser intuitiva y fácil de usar, permitiendo que un usuario comprenda cómo navegar, buscar películas y publicar reseñas
- RNF-2 Los datos de los usuarios deben ser íntegros conforme a criterios de seguridad de cifrado 
- RNF-3 Tras 5 intentos fallidos de inicio de sesión, bloquear el acceso durante 15 minutos 
- RNF-4 La sesión de usuario expirará después de 30 minutos de inactividad para reforzar la seguridad
- RNF‑5 El sistema soporta los navegadores web modernos tales como brave, opera, entre otros.


# Tecnologías Usadas
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


# UX (Experiencia de Usuario)
La experiencia de usuario se enfoca en la simplicidad, íconos reconocibles (corazón, lupa) y formularios con campos bien espaciados. Cada acción relevante como agregar a favoritos o escribir una reseña, está accesible con pocos toques, y los elementos como calificaciones con estrellas o botones de reproducción de video aportan interactividad de manera rápida

En la versión web, la navegación se organiza con un header fijo que permite moverse entre inicio, favoritos, perfil y acciones administrativas según el rol del usuario. Las vistas están claramente separadas: inicio de sesión, registro, visualización de películas, creación y lectura de reseñas, y favoritos


# Prueba con insomnia

Se validó el flujo completo de autenticación y gestión de reseñas con Insomnia: primero se registró un usuario mediante `POST /auth/register`, luego se inició sesión con `POST /auth/login`; a continuación se crearon dos reseñas usando `POST /peliculas/:peliculaId/resenas` y finalmente se recuperaron todas las reseñas con `GET /peliculas/:peliculaId/resenas`. Las capturas de estas pruebas están en la carpeta `otros/pruebas-insomnia` en la raíz del proyecto.



# Instrucciones de instalación y ejecución

---

## 1. Requisitos previos

Antes de comenzar, asegúrarse de contar con las siguientes herramientas instaladas y configuradas:

* **Node.js** (recomendado v14 o superior)
* **Ionic CLI**
* **Git** (para clonar el repositorio)
* **XAMPP** (con Apache y MySQL)

* Iniciar Apache y MySQL desde el panel de control de XAMPP.
* Verifica que MySQL esté escuchando en el puerto `3306`.

---

## 2. Clonar el repositorio

Abrir una terminal y ejecutar los siguientes comandos para clonar el repositorio y posicionarse en la carpeta del proyecto:

```bash
git clone https://github.com/Claudio018/Proyecto-Web-FilmRate.git
cd Proyecto-Web-FilmRate
```

---

## 3. Configuración de la base de datos

1. En XAMPP, asegúrarse de que **Apache** y **MySQL** estén activos.
2. Abrir **phpMyAdmin** (por defecto en `http://localhost/phpmyadmin`).
3. Crea una nueva base de datos llamada:

   ```
   filmrate_db
   ```

---

## 4. Instalación de dependencias

Se recomienda abrir dos terminales en paralelo para gestionar el backend y el frontend por separado.

### Terminal 1: Backend

```bash
cd Proyecto-Web-FilmRate/backend
npm install
```

### Terminal 2: Frontend

```bash
cd Proyecto-Web-FilmRate/frontend
npm install
```

---

## 5. Ejecución del proyecto

A continuación, se detallan los pasos para poner en marcha tanto el backend como el frontend.

### 5.1. Iniciar el backend

En la **Terminal 1** (dentro de `backend`), ejecutar:

```bash
node index.js
```

Este comando levantará el servidor backend en el puerto configurado (por defecto, `http://localhost:3000`).

### 5.2. Iniciar el frontend

En la **Terminal 2** (dentro de `frontend`), ejecutar:

```bash
ionic serve
```

Al finalizar la compilación, Ionic abrirá automáticamente una ventana del navegador en:

```
http://localhost:8100/
```

---

## 6. Notas finales

* Si desea detener cualquiera de los servidores, presionar `Ctrl + C` en la terminal correspondiente.
* Asegúrarse de que no haya otro servicio ocupando los puertos `3000` (backend) y `8100` (frontend).

