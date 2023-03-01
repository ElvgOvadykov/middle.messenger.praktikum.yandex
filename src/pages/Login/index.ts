import Block from "@utils/Block";
import Button from "@components/Button";
import Input from "@components/Input";
import Link from "@components/Link";

import getGoToPageFunction from "@utils/getGoToPageFunction";
import { loginPageValidationSchema } from "@utils/validation/validationSchems";
import getErrors from "@utils/validation";

import template from "./login.hbs";

import "./style.scss";

interface ILoginPageProps {
  state: {
    /** Массив ошибок */
    error: Record<string, string>;
  };
}

export default class LoginPage extends Block {
  constructor() {
    const props: ILoginPageProps = {
      state: {
        error: {},
      },
    };

    super(props);
  }

  init() {
    this.childrens.login = new Input({
      name: "login",
      lableTitle: "Логин",
      type: "text",
      events: {
        blur: () => {
          this.validation();
        },
      },
    });

    this.childrens.password = new Input({
      name: "password",
      lableTitle: "Пароль",
      type: "password",
      events: {
        blur: () => {
          this.validation();
        },
      },
    });

    this.childrens.buttonSubmit = new Button({
      type: "submit",
      contentValue: "Вход",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          this.submitHandler();
        },
      },
    });

    this.childrens.linkToSignUp = new Link({
      linkHref: "",
      linkTitle: "Регистрация",
      events: {
        click: getGoToPageFunction("signUp"),
      },
    });
  }

  getInputsData(): Record<string, string> {
    return Object.values(this.childrens).reduce((acc, current) => {
      if (current instanceof Input) {
        return Object.assign(acc, { [current.name]: current.value });
      }

      return acc;
    }, {});
  }

  updateInputErrorsMessage(
    data: ReturnType<typeof this.getInputsData>,
    errors: ReturnType<typeof getErrors>
  ) {
    Object.keys(data).forEach((key) => {
      const input = this.childrens[key] as Input;

      if (errors[key]) {
        input.setProps({ error: errors[key] });
      } else {
        input.setProps({ error: undefined });
      }

      input.setValue(data[key]);
    });
  }

  validation() {
    const data = this.getInputsData();

    const errors = getErrors(data, loginPageValidationSchema);

    this.setProps({ state: { errors } });

    this.updateInputErrorsMessage(data, errors);
  }

  hasErrors() {
    if (!this.props.state?.errors) {
      return false;
    }

    return Object.keys(this.props.state.errors).length > 0;
  }

  submitHandler() {
    if (!this.hasErrors()) {
      const data = this.getInputsData();

      console.log(data);
    }
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
