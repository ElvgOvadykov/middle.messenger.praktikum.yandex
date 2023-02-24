import Block from "@utils/Block";
import Input from "@components/Input";
import Button from "@components/Button";

import template from "./index.hbs";

export default class UploadAvatarModal extends Block {
  init() {
    this.childrens.takeFile = new Input({
      lableTitle: "",
      type: "file",
      name: "avatar"
    });

    this.childrens.saveAvatarButton = new Button({
      contentValue: "Сохранить изменения",
      type: "button",
      events: {
        click: () => {
          this.hide();
        }
      }
    });
  }

  componentDidMount(): void {
    this.element?.addEventListener("click", (event: Event) => {
      const { target } = event;

      if ((target as HTMLDivElement).matches("#uploadAvatarModal")) {
        this.hide();
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
