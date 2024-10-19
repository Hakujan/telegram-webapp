document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript загружен и готов к работе"); // Для отладки

  const startButton = document.getElementById("start-btn");

  // Обработка клика по кнопке "Начать чат"
  startButton.addEventListener("click", () => {
    window.location.href = "/courses"; // Перенаправление на страницу courses
  });
});
