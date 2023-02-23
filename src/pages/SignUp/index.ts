import Block from "@utils/Block";
import Input from "@components/Input";
import Link from "@components/Link";
import Button from "@components/Button";

import getGoToPageFunction from "@utils/getGoToPageFunction";

import template from "./signUp.hbs";

export default class SignUpPage extends Block {
  init() {
    this.childrens.login = new Input({
      name: "login",
      lableTitle: "Логин",
      type: "text",
    });

    this.childrens.email = new Input({
      name: "email",
      lableTitle: "Почта",
      type: "text",
    });

    this.childrens.firstName = new Input({
      name: "first_name",
      lableTitle: "Имя",
      type: "text",
    });

    this.childrens.secondName = new Input({
      name: "second_name",
      lableTitle: "Фамилия",
      type: "text",
    });

    this.childrens.displayName = new Input({
      name: "display_name",
      lableTitle: "Имя в чате",
      type: "text",
    });

    this.childrens.phone = new Input({
      name: "phone",
      lableTitle: "Телефон",
      type: "tel",
    });

    this.childrens.password = new Input({
      name: "password",
      lableTitle: "Пароль",
      type: "password",
    });

    this.childrens.repeatPassword = new Input({
      name: "repeatPassword",
      lableTitle: "Повторите пароль",
      type: "password",
    });

    this.childrens.buttonSubmit = new Button({
      type: "submit",
      contentValue: "Регистрация",
      events: {
        click: () => console.log(),
      },
    });

    this.childrens.linkToLogin = new Link({
      linkHref: "",
      linkTitle: "Уже есть профиль?",
      events: {
        click: getGoToPageFunction("login"),
      },
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
