/**
 * Временное решение для перехода на главную страницу при помощи событий кнопок
 */
export default function goToHomeEvent(event) {
  event.preventDefault();
  const a = document.createElement("a");
  a.setAttribute("href", "/");
  a.click();
}
