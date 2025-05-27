/**
 * app.js - Consume API de GitHub para mostrar información de usuario
 * Correcciones realizadas:
 * 1. Selectores del DOM corregidos
 * 2. Manejo adecuado de async/await
 * 3. Validación de respuesta HTTP
 * 4. Parseo correcto de datos JSON
 * 5. Manejo de errores mejorado
 */

// Endpoints base de la API de GitHub
const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;

// Selección de elementos del DOM - Corregidos los selectores:
// - Cambiado 'name' a '.name' (selector de clase)
// - Cambiado '#blog' a '.blog' (era clase no ID)
const $name = document.querySelector('.name');
const $blog = document.querySelector('.blog');

/**
 * Muestra información de un usuario de GitHub
 * @param {string} username - Nombre de usuario en GitHub
 */
async function displayUser(username) {
  try {
    // Mostrar estado de carga
    $name.textContent = 'Cargando...';
    $blog.textContent = '';

    // Hacer petición a la API
    const response = await fetch(`${usersEndpoint}/${username}`);

    // Validar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error HTTP! estado: ${response.status}`);
    }

    // Parsear datos de la respuesta
    const data = await response.json();

    // Mostrar datos en el DOM - usando template literals correctamente
    $name.textContent = data.name || 'Nombre no disponible';
    $blog.textContent = data.blog || 'Blog no disponible';

  } catch (err) {
    handleError(err);
  }
}

/**
 * Maneja errores de la aplicación
 * @param {Error} err - Objeto de error
 */
function handleError(err) {
  console.error('Error en la aplicación:', err);
  $name.textContent = `Error: ${err.message}`;
  $blog.textContent = 'No se pudo cargar la información';
}

// Llamar a la función con un usuario por defecto
displayUser('stolinski');
