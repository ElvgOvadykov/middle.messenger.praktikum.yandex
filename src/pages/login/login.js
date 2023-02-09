const button = document.querySelector("button[type='submit']");

button.onclick = function (event) {
  event.preventDefault();
  const a = document.createElement("a");
  a.setAttribute("href", "/");
  a.click();
};
