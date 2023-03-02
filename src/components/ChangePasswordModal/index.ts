import Block from "@utils/Block";
import Input from "@components/Input";
import Button from "@components/Button";

import template from "./index.hbs";

interface IChangePasswordModalProps {
  onCloseModal: () => void;
}

export default class ChangePasswordModal extends Block {
  constructor(props: IChangePasswordModalProps) {
    super(props);
  }

  protected addEvents(): void {
    this.element?.addEventListener("click", (event: Event) => {
      const { target } = event;

      if ((target as HTMLDivElement).matches("#changePasswordModal")) {
        this.props.onCloseModal();
      }
    });
  }

  init() {
    this.childrens.oldPassword = new Input({
      name: "oldPassword",
      lableTitle: "Прежний пароль",
      type: "password",
    });

    this.childrens.newPassword = new Input({
      name: "newPassword",
      lableTitle: "Новый пароль",
      type: "password",
    });

    this.childrens.repeatNewPassword = new Input({
      name: "repeatNewPassword",
      lableTitle: "Повторите пароль",
      type: "password",
    });

    this.childrens.savePasswordButton = new Button({
      type: "submit",
      contentValue: "Изменить пароль",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          this.hide();
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
