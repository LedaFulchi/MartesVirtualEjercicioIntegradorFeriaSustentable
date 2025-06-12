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

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop(); // Obtiene el nombre del archivo actual

    // Lógica para resaltar el enlace activo en el menú de navegación (si aplica)
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        // Para enlaces directos como "Queres ser feriante?" o "Contactanos"
        if (link.href.includes(currentPage) && currentPage !== '') {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // Para los elementos del dropdown, necesitamos verificar si algún sub-enlace es el actual
    const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');
    dropdownItems.forEach(item => {
        if (item.href.includes(currentPage) && currentPage !== '') {
            // Encuentra el 'nav-link dropdown-toggle' padre del elemento activo
            const parentDropdownToggle = item.closest('.nav-item.dropdown').querySelector('.nav-link.dropdown-toggle');
            if (parentDropdownToggle) {
                parentDropdownToggle.classList.add('active');
                parentDropdownToggle.setAttribute('aria-current', 'page');
            }
        }
    });

    // Aquí no necesitamos JavaScript adicional para el modal,
    // ya que Bootstrap 5 maneja la funcionalidad con los atributos data-bs-toggle y data-bs-target.
    // El HTML ya está configurado para que los botones abran los modales correspondientes.
});