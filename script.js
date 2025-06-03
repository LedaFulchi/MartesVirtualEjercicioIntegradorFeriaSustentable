document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop(); // Obtiene el nombre del archivo actual

const quienesSomosDropdown = document.querySelector('.nav-item.dropdown a.nav-link.dropdown-toggle[href="#"]');

if (quienesSomosDropdown) {
    const nuestroObjetivoLink = quienesSomosDropdown.nextElementSibling.querySelector('a[href="nuestroObjetivo.html"]');

    if (currentPage === 'nuestroObjetivo.html' && nuestroObjetivoLink) {
      // Agrega la clase 'active' al enlace del dropdown
    quienesSomosDropdown.classList.add('active');
      quienesSomosDropdown.setAttribute('aria-current', 'page'); // Opcional: para accesibilidad
    }
}
});