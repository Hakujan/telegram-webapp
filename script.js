document.addEventListener("DOMContentLoaded", function () {
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        const tg = Telegram.WebApp;
        const totalLessons = 7; // Общее количество уроков

        let completedLessons = 0; // Счетчик завершенных уроков
        let correctAnswers = 0;   // Счетчик правильных ответов на тесты
        let completedPractice = 0; // Счетчик выполненных практических заданий

        const user = tg.initDataUnsafe?.user || { first_name: "Пользователь" };
        document.getElementById("user-name").innerText = `Привет, ${user.first_name}!`;

        document.getElementById("finish-btn").addEventListener("click", function () {
            tg.close();
        });

        function loadCourses() {
            const coursesList = document.getElementById("courses");
            coursesList.innerHTML = '';

            coursesData.forEach(course => {
                const li = document.createElement("li");
                li.innerText = course.title;
                li.addEventListener("click", () => loadLessons(course));
                coursesList.appendChild(li);
            });
        }

        function loadLessons(course) {
            document.getElementById("course-list").style.display = 'none';
            document.getElementById("lesson-list").style.display = 'block';
            document.getElementById("course-title").innerText = course.title;

            const lessonsList = document.getElementById("lessons");
            lessonsList.innerHTML = '';

            course.lessons.forEach((lesson, index) => {
                const li = document.createElement("li");
                li.innerText = `${index + 1}. ${lesson.title}`;
                li.addEventListener("click", () => loadLessonDetails(lesson));
                lessonsList.appendChild(li);
            });
        }

        function loadLessonDetails(lesson) {
            document.getElementById("lesson-list").style.display = 'none';
            document.getElementById("lesson-details").style.display = 'block';
            document.getElementById("lesson-title").innerText = lesson.title;

            const stagesDiv = document.getElementById("stages");
            stagesDiv.innerHTML = '';

            lesson.stages.forEach((stage, index) => {
                const div = document.createElement("div");
                div.className = 'stage';
                div.innerHTML = `<h3>${capitalize(stage.type)}</h3><p>${stage.content}</p>`;

                // Добавляем возможность завершения этапов для каждого этапа
                const button = document.createElement("button");
                button.innerText = "Завершить этап";
                button.addEventListener("click", () => completeStage(stage, index));
                div.appendChild(button);

                stagesDiv.appendChild(div);
            });
        }

        function completeStage(stage, index) {
            alert(`Этап "${capitalize(stage.type)}" завершен!`);
            // Увеличиваем счетчики для тестов и практики
            if (stage.type === "test") {
                correctAnswers += 5; // Предполагаем 5 правильных ответов на тест
            } else if (stage.type === "practice") {
                completedPractice++;
            }
            // Проверка на завершение всех уроков
            if (index === 2) { // 3 этапа в каждом уроке
                completedLessons++;
                if (completedLessons === totalLessons) {
                    showResults();
                } else {
                    document.getElementById("lesson-details").style.display = 'none';
                    document.getElementById("lesson-list").style.display = 'block';
                }
            }
        }

        function showResults() {
            document.getElementById("lesson-details").style.display = 'none';
            document.getElementById("results").style.display = 'block';

            document.getElementById("completed-lessons").innerText = completedLessons;
            document.getElementById("correct-answers").innerText = correctAnswers;
            document.getElementById("completed-practice").innerText = completedPractice;

            const message = completedLessons === totalLessons ? "Поздравляем, вы успешно завершили курс!" : "Курс завершен частично.";
            document.getElementById("result-message").innerText = message;
        }

        function capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        loadCourses();
    }
});
