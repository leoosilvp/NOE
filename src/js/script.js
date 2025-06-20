document.addEventListener('DOMContentLoaded', function () {

    // menu sanduiche
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');

    mobileMenu.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Carrossel de histórias
    const storiesCarousel = document.querySelector('.stories-carousel');
    if (storiesCarousel) {
        const stories = document.querySelectorAll('.story');
        let currentStory = 0;

        function showStory(index) {
            stories.forEach((story, i) => {
                story.style.display = i === index ? 'block' : 'none';
            });
        }

        function nextStory() {
            currentStory = (currentStory + 1) % stories.length;
            showStory(currentStory);
        }

        // Mostrar primeira história
        showStory(currentStory);

        // Trocar a cada 8 segundos
        setInterval(nextStory, 5000);
    }

    // Carousel fots
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    let currentIndex = 0;
    const slideCount = slides.length;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-advance carousel
    let carouselInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    const carouselSection = document.querySelector('.solution-carousel');
    carouselSection.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    carouselSection.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextSlide, 5000);
    });

    // Tabs de benefícios
    const benefitTabButtons = document.querySelectorAll('.benefit-tab');
    const benefitContents = document.querySelectorAll('.benefits-content');

    benefitTabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const benefitId = this.getAttribute('data-benefit');

            // Remover classe ativa de todos os botões e conteúdos
            benefitTabButtons.forEach(btn => btn.classList.remove('active'));
            benefitContents.forEach(content => content.classList.remove('active'));

            // Adicionar classe ativa ao botão e conteúdo selecionado
            this.classList.add('active');
            document.getElementById(benefitId).classList.add('active');
        });
    });

    // Quiz Functionality
    const quizData = [
        {
            question: "Qual o principal objetivo do NOÉ?",
            options: [
                "Monitorar tráfego urbano",
                "Alertar sobre riscos de enchente",
                "Controlar iluminação pública"
            ],
            answer: 1
        },
        {
            question: "Como os sensores do NOÉ funcionam?",
            options: [
                "Usam apenas câmeras",
                "Medem nível de água e enviam dados",
                "Dependem de satélites"
            ],
            answer: 1
        },
        {
            question: "Quanto tempo de antecedência o NOÉ pode alertar?",
            options: [
                "Até 12 horas",
                "Até 24 horas",
                "Até 48 horas"
            ],
            answer: 2
        },
        {
            question: "O aplicativo do NOÉ funciona sem internet?",
            options: [
                "Sim, em modo offline",
                "Não, precisa sempre de conexão",
                "Apenas em áreas urbanas"
            ],
            answer: 0
        },
        {
            question: "Qual canal NÃO é usado pelo NOÉ para alertas?",
            options: [
                "SMS",
                "WhatsApp",
                "Televisão"
            ],
            answer: 2
        },
        {
            question: "Quem pode usar o NOÉ?",
            options: [
                "Apenas governos",
                "Apenas comunidades",
                "Todos os públicos"
            ],
            answer: 2
        },
        {
            question: "Como as comunidades participam?",
            options: [
                "Apenas recebendo alertas",
                "Reportando alagamentos",
                "Instalando sensores"
            ],
            answer: 1
        },
        {
            question: "Qual benefício NÃO é do NOÉ?",
            options: [
                "Reduz danos materiais",
                "Aumenta o turismo",
                "Salva vidas"
            ],
            answer: 1
        },
        {
            question: "O NOÉ usa qual tecnologia para previsão?",
            options: [
                "Inteligência Artificial",
                "Apenas dados históricos",
                "Opinião de especialistas"
            ],
            answer: 0
        },
        {
            question: "Qual cor representa risco crítico?",
            options: [
                "Verde",
                "Amarelo",
                "Vermelho"
            ],
            answer: 2
        }
    ];

    const quizContainer = document.getElementById('quizContainer');
    const quizIntro = document.querySelector('.quiz-intro');
    const quizQuestions = document.getElementById('quizQuestions');
    const quizResult = document.getElementById('quizResult');
    const startQuizBtn = document.getElementById('startQuiz');
    const nextQuestionBtn = document.getElementById('nextQuestion');
    const restartQuizBtn = document.getElementById('restartQuiz');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const resultTitle = document.getElementById('resultTitle');
    const resultText = document.getElementById('resultText');

    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;

    startQuizBtn.addEventListener('click', startQuiz);
    nextQuestionBtn.addEventListener('click', nextQuestion);
    restartQuizBtn.addEventListener('click', restartQuiz);

    function startQuiz() {
        quizIntro.style.display = 'none';
        quizQuestions.style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        const question = quizData[currentQuestion];
        questionElement.textContent = question.question;

        optionsElement.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(index));
            optionsElement.appendChild(optionElement);
        });

        nextQuestionBtn.style.display = 'none';
        selectedOption = null;
    }

    function selectOption(index) {
        const options = document.querySelectorAll('.option');
        options.forEach(option => option.classList.remove('selected'));
        options[index].classList.add('selected');
        selectedOption = index;
        nextQuestionBtn.style.display = 'block';
    }

    function nextQuestion() {
        if (selectedOption === null) return;

        if (selectedOption === quizData[currentQuestion].answer) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        quizQuestions.style.display = 'none';
        quizResult.style.display = 'block';

        const percentage = Math.round((score / quizData.length) * 100);

        if (percentage >= 80) {
            resultTitle.textContent = 'Excelente!';
            resultText.textContent = `Você acertou ${score} de ${quizData.length} perguntas! Você conhece muito sobre prevenção de enchentes.`;
        } else if (percentage >= 50) {
            resultTitle.textContent = 'Bom trabalho!';
            resultText.textContent = `Você acertou ${score} de ${quizData.length} perguntas! Você sabe o básico sobre o NOÉ.`;
        } else {
            resultTitle.textContent = 'Pode melhorar!';
            resultText.textContent = `Você acertou ${score} de ${quizData.length} perguntas. Aprenda mais sobre o NOÉ para se proteger melhor.`;
        }
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        quizResult.style.display = 'none';
        quizIntro.style.display = 'block';
    }
});