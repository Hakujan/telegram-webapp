document.addEventListener('DOMContentLoaded', () => {
    const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
    const colorNames = {
        'red': 'Красный',
        'blue': 'Синий',
        'green': 'Зелёный',
        'yellow': 'Жёлтый',
        'orange': 'Оранжевый',
        'purple': 'Фиолетовый'
    };
    const circlesContainer = document.getElementById('circles-container');
    const generateButton = document.getElementById('generate-button');
    const colorNameElement = document.getElementById('color-name');
    const messageElement = document.getElementById('message');
    const progressContainer = document.getElementById('progress-container');
    let targetColor = '';
    let currentLevel = 0;
    const totalLevels = 10;

    function initializeProgress() {
        progressContainer.innerHTML = '';
        for (let i = 0; i < totalLevels; i++) {
            const star = document.createElement('span');
            star.classList.add('star');
            star.innerHTML = '★';
            progressContainer.appendChild(star);
        }
    }

    function updateProgress(level) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < level) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    function generateCircles() {
        circlesContainer.innerHTML = ''; // Очистить контейнер
        const shuffledColors = colors.sort(() => 0.5 - Math.random());
        targetColor = shuffledColors[Math.floor(Math.random() * shuffledColors.length)];
        colorNameElement.textContent = `Найдите цвет: ${colorNames[targetColor]}`;
        messageElement.textContent = '';
        shuffledColors.forEach(color => {
            const circle = document.createElement('div');
            circle.classList.add('circle');
            circle.style.backgroundColor = color;
            circle.addEventListener('click', () => {
                if (color === targetColor) {
                    messageElement.textContent = 'Правильно!';
                    currentLevel++;
                    updateProgress(currentLevel);
                    if (currentLevel < totalLevels) {
                        setTimeout(generateCircles, 1000);
                    } else {
                        messageElement.textContent = 'Поздравляем! Вы прошли все уровни!';
                        generateButton.classList.remove('hidden'); // Показать кнопку
                    }
                } else {
                    messageElement.textContent = 'Неправильно! Попробуйте ещё раз.';
                }
            });
            circlesContainer.appendChild(circle);
        });
    }

    generateButton.addEventListener('click', () => {
        currentLevel = 0;
        initializeProgress();
        generateButton.classList.add('hidden'); // Скрыть кнопку
        generateCircles();
    });

    initializeProgress();
});
