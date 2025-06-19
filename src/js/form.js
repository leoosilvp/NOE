// Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    // Name validation
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Por favor, insira seu nome';
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Por favor, insira um e-mail válido';
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    // Subject validation
    if (subjectInput.value === '') {
        subjectError.textContent = 'Por favor, selecione um assunto';
        subjectError.style.display = 'block';
        isValid = false;
    } else {
        subjectError.style.display = 'none';
    }

    // Message validation
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Por favor, insira sua mensagem';
        messageError.style.display = 'block';
        isValid = false;
    } else {
        messageError.style.display = 'none';
    }

    if (isValid) {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
    }
});