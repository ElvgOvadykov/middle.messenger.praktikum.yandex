import Block from "@utils/Block";
import Input from "@components/Input";
import Button from "@components/Button";
import ChangePasswordModal from "@components/ChangePasswordModal";
import UploadAvatarModal from "@components/UploadAvatarModal";

import getGoToPageFunction from "@utils/getGoToPageFunction";

import template from "./profile.hbs";

import "./style.scss";

export default class ProfilePage extends Block {
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

    this.childrens.submitButton = new Button({
      type: "submit",
      contentValue: "Сохранить изменения",
      events: {
        click: getGoToPageFunction("home"),
      },
    });

    this.childrens.changePasswordModal = new ChangePasswordModal({});

    this.childrens.uploadAvatarModal = new UploadAvatarModal({});

    this.childrens.toggleChangePasswordModuleButton = new Button({
      type: "button",
      contentValue: "Изменить пароль",
      events: {
        click: () => {
          (this.childrens.changePasswordModal as ChangePasswordModal).show();
        },
      },
    });
  }

  componentDidMount(): void {
    const avatarBlock = document.querySelector(".profile-avatar-block");

    avatarBlock?.addEventListener("click", () =>
      (this.childrens.uploadAvatarModal as ChangePasswordModal).show()
    );
  }

  render() {
    return this.compile(template, this.props);
  }
}
