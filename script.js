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

// Chatbot mejorado
document.addEventListener('DOMContentLoaded', function() {
    const chatboxIcon = document.getElementById('chatbox-icon');
    const chatboxPopup = document.getElementById('chatbox-popup');
    const chatboxCloseBtn = document.getElementById('chatbox-close-btn');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessages = document.getElementById('chatbox-messages');

    // Base de conocimiento del chatbot
    const chatbotResponses = {
        saludos: {
            patrones: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'como estas'],
            respuestas: [
                '¡Hola! Soy el asistente virtual de Conciencia Verde. ¿En qué puedo ayudarte hoy? 🌱',
                '¡Bienvenido a Conciencia Verde! ¿Cómo puedo asistirte? 🌿',
                '¡Hola! Estoy aquí para ayudarte con información sobre nuestra feria sustentable. ¿Qué te gustaría saber? 🌎'
            ]
        },
        productos: {
            patrones: ['productos', 'que venden', 'que ofrecen', 'que tienen', 'cosmetica', 'alimentos', 'ropa', 'juguetes', 'plantas', 'tecnologia'],
            respuestas: [
                'En nuestra feria encontrarás una gran variedad de productos sustentables: cosmética natural, alimentos orgánicos, ropa ecológica, juguetes educativos, plantas y más. ¿Hay alguna categoría específica que te interese? 🌱',
                'Ofrecemos productos eco-friendly en diferentes categorías. ¿Te gustaría saber más sobre algún tipo específico de producto? 🌿',
                'Tenemos desde cosmética natural hasta tecnología verde. ¿Qué tipo de productos sustentables te interesan? 🌎'
            ]
        },
        feriante: {
            patrones: ['ser feriante', 'vender', 'participar', 'unirme', 'feriante', 'vendedor', 'expositor'],
            respuestas: [
                '¡Nos encanta que quieras ser parte de nuestra comunidad! Para ser feriante necesitas productos sustentables y un compromiso con el medio ambiente. ¿Te gustaría que te cuente más sobre el proceso? 🌱',
                'Ser feriante en Conciencia Verde es una gran oportunidad. ¿Quieres que te explique los requisitos y beneficios? 🌿',
                '¡Excelente decisión! Para unirte como feriante, visita nuestra sección "Querés ser feriante?" o puedo contarte más detalles. ¿Qué te gustaría saber? 🌎'
            ]
        },
        ubicacion: {
            patrones: ['donde', 'ubicacion', 'direccion', 'lugar', 'dirección', 'ubicación', 'encontrar', 'buscar'],
            respuestas: [
                'Nuestra feria es itinerante y recorre diferentes puntos de la provincia. ¿Te gustaría saber las próximas fechas y ubicaciones? 🌱',
                'Visitamos diferentes localidades durante el año. ¿En qué zona te gustaría encontrarnos? 🌿',
                '¡Nos movemos por toda la provincia! ¿Quieres que te cuente sobre las próximas fechas en tu zona? 🌎'
            ]
        },
        contacto: {
            patrones: ['contacto', 'comunicar', 'hablar', 'llamar', 'escribir', 'mensaje', 'email', 'correo', 'telefono', 'teléfono'],
            respuestas: [
                'Puedes contactarnos a través de nuestro formulario en la sección "Contactanos" o por nuestras redes sociales. ¿Te gustaría que te pase los enlaces? 🌱',
                '¡Estamos para ayudarte! Puedes escribirnos por el formulario de contacto o seguirnos en redes sociales. ¿Qué prefieres? 🌿',
                'Tenemos varios canales de comunicación. ¿Te gustaría que te cuente las diferentes formas de contactarnos? 🌎'
            ]
        },
        despedida: {
            patrones: ['chau', 'adios', 'hasta luego', 'nos vemos', 'gracias', 'bye'],
            respuestas: [
                '¡Gracias por tu interés en Conciencia Verde! Esperamos verte pronto en alguna de nuestras ferias. ¡Que tengas un día sustentable! 🌱',
                '¡Hasta pronto! Recuerda que cada pequeña acción cuenta para cuidar nuestro planeta. 🌿',
                '¡Nos vemos! No olvides que juntos podemos hacer la diferencia. ¡Vuelve pronto! 🌎'
            ]
        },
        default: {
            respuestas: [
                'Lo siento, no estoy seguro de entender. ¿Podrías reformular tu pregunta? Estoy aquí para ayudarte con información sobre nuestra feria sustentable. 🌱',
                'No tengo esa información específica, pero puedo ayudarte con otros aspectos de nuestra feria. ¿Qué más te gustaría saber? 🌿',
                'Interesante pregunta. ¿Te gustaría saber sobre nuestros productos, cómo ser feriante o las próximas fechas de la feria? 🌎'
            ]
        }
    };

    // Función para obtener una respuesta aleatoria
    function getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Función para encontrar la categoría de respuesta adecuada
    function findResponseCategory(message) {
        message = message.toLowerCase();
        for (let category in chatbotResponses) {
            if (category !== 'default') {
                const patterns = chatbotResponses[category].patrones;
                if (patterns.some(pattern => message.includes(pattern))) {
                    return category;
                }
            }
        }
        return 'default';
    }

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
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Función para procesar el mensaje del usuario
    function processUserMessage(message) {
        const category = findResponseCategory(message);
        const response = getRandomResponse(chatbotResponses[category].respuestas);
        
        // Simular "escribiendo..." antes de responder
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('chat-message', 'bot-message', 'typing-indicator');
        typingIndicator.innerHTML = '<p>Escribiendo...</p>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Eliminar el indicador y mostrar la respuesta después de un breve delay
        setTimeout(() => {
            chatMessages.removeChild(typingIndicator);
            addMessage(response, 'bot');
        }, 1000);
    }

    // Muestra/oculta el chatbox
    chatboxIcon.addEventListener('click', function() {
        chatboxPopup.classList.toggle('show');
        if (chatboxPopup.classList.contains('show')) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
            chatInput.focus();
        }
    });

    // Cierra el chatbox
    chatboxCloseBtn.addEventListener('click', function() {
        chatboxPopup.classList.remove('show');
    });

    // Envía mensaje con el botón
    chatSendBtn.addEventListener('click', function() {
        sendMessage();
    });

    // Envía mensaje con Enter
    chatInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText !== '') {
            addMessage(messageText, 'user');
            chatInput.value = '';
            processUserMessage(messageText);
        }
    }
});

// Manejo de la visualización de productos para la lista sin modals
document.addEventListener('DOMContentLoaded', function() {
    const showProductsButtons = document.querySelectorAll('.show-products-btn');
    
    showProductsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productList = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Toggle la clase active en el botón
            this.classList.toggle('active');
            
            // Toggle la clase show en la lista
            if (isActive) {
                productList.classList.remove('show');
                this.textContent = 'Ver productos';
            } else {
                productList.classList.add('show');
                this.textContent = 'Ocultar productos';
            }
        });
    });
});
