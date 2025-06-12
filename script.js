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
});

//para el chatbox
document.addEventListener('DOMContentLoaded', function() {
    const chatboxIcon = document.getElementById('chatbox-icon');
    const chatboxPopup = document.getElementById('chatbox-popup');
    const chatboxCloseBtn = document.getElementById('chatbox-close-btn');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessages = document.getElementById('chatbox-messages');

    // Función para agregar un mensaje al chat
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        if (sender === 'user') {
            messageElement.classList.add('user-message');
        } else {
            messageElement.classList.add('bot-message');
        }
        messageElement.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageElement);
        // Desplazar hacia abajo para ver el último mensaje
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Muestra/oculta el chatbox al hacer click en el icono
    chatboxIcon.addEventListener('click', function() {
        chatboxPopup.classList.toggle('show');
        if (chatboxPopup.classList.contains('show')) {
            // Desplazar hacia abajo al abrir para ver el mensaje inicial si es necesario
            chatMessages.scrollTop = chatMessages.scrollHeight;
            chatInput.focus(); // Pone el foco en el input al abrir
        }
    });

    // Oculta el chatbox al hacer click en el botón de cerrar
    chatboxCloseBtn.addEventListener('click', function() {
        chatboxPopup.classList.remove('show');
    });

    // Envía el mensaje cuando se hace click en el botón "Enviar"
    chatSendBtn.addEventListener('click', function() {
        sendMessage();
    });

    // Envía el mensaje cuando se presiona Enter en el campo de texto
    chatInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = chatInput.value.trim(); // .trim() elimina espacios en blanco al inicio/final

        if (messageText !== '') { // Solo envía si el mensaje no está vacío
            addMessage(messageText, 'user');
            chatInput.value = ''; // Limpia el campo de entrada

            // Simular una respuesta del bot (opcional, para demostrar)
            setTimeout(() => {
                addMessage("Gracias por tu mensaje. Un representante se pondrá en contacto pronto.", 'bot');
            }, 1000); // Responde después de 1 segundo
        }
    }
});