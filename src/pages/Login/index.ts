import Block from "@utils/Block";
import Button from "@components/Button";
import Input from "@components/Input";
import Link from "@components/Link";

import getGoToPageFunction from "@utils/getGoToPageFunction";

import template from "./login.hbs";

import "./style.scss";

export default class LoginPage extends Block {
  init() {
    this.childrens.inputLogin = new Input({
      name: "login",
      lableTitle: "Логин",
      type: "text",
    });

    this.childrens.inputPassword = new Input({
      name: "password",
      lableTitle: "Пароль",
      type: "password",
    });

    this.childrens.buttonSubmit = new Button({
      type: "submit",
      contentValue: "Вход",
      events: {
        click: () => console.log(),
      },
    });

    this.childrens.linkToSignUp = new Link({
      linkHref: "",
      linkTitle: "Регистрация",
      events: {
        click: getGoToPageFunction("signUp"),
      }
    });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
