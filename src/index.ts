import Button from "@components/button";

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

  root.append(button.getContent()!);

  button.dispatchComponentDidMount();

  setTimeout(() => button.setProps({contentValue: "Кнопка 2"}), 5000);
});
