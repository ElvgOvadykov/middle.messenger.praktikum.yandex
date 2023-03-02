import Block from "@utils/Block";
import Input from "@components/Input";
import Button from "@components/Button";

import template from "./index.hbs";

interface IUploadAvatarModalProps {
  onCloseModal: () => void;
}

export default class UploadAvatarModal extends Block<IUploadAvatarModalProps> {
  constructor(props: IUploadAvatarModalProps) {
    super(props);
  }

  protected addEvents(): void {
    this.element?.addEventListener("click", (event: Event) => {
      const { target } = event;

      if ((target as HTMLDivElement).matches("#uploadAvatarModal")) {
        this.props.onCloseModal();
      }
    });
  }

  init() {
    this.childrens.takeFile = new Input({
      lableTitle: "",
      type: "file",
      name: "avatar",
    });

    this.childrens.saveAvatarButton = new Button({
      contentValue: "Сохранить изменения",
      type: "button",
      events: {
        click: this.props.onCloseModal,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
