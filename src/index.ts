import Button from "@components/Button";
import Input from "@components/Input";
import Link from "@components/Link";

// enum ROUTES = {
//   home
// }

// function renderDOM(route: key)

window.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app")!;

  const button = new Button({
    contentValue: "Кнопка",
    id: "login",
    type: "button",
    events: {
      click: () => console.log("onclick"),
    },
  });

  const link = new Link({
    linkHref: "https://ya.ru",
    linkTitle: "Yandex",
  });

  const input = new Input({
    lableTitle: "Login",
    name: "login",
    type: "text",
  });

  root.append(button.getContent()!);
  root.append(link.getContent()!);
  root.append(input.getContent()!);

  button.dispatchComponentDidMount();
  link.dispatchComponentDidMount();
  input.dispatchComponentDidMount();
});
