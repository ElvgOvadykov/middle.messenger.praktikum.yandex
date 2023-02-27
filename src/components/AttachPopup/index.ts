import Block from "@utils/Block";
import Button, { ButtonColor } from "@components/Button";

import template from "./attachPopup.hbs";

import "./style.scss";

export default class AttachPopup extends Block {
  protected init(): void {
    this.childrens.photoOrVideo = new Button({
      contentValue: "Фото или видео",
      type: "button",
      color: ButtonColor.White,
    });

    this.childrens.file = new Button({
      contentValue: "Файл",
      type: "button",
      color: ButtonColor.White,
    });

    this.childrens.location = new Button({
      contentValue: "Локация",
      type: "button",
      color: ButtonColor.White,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
