import Block from "@utils/Block";
import Input from "@components/Input";
import Button from "@components/Button";

import template from "./index.hbs";

import "./style.scss";

interface IUploadAvatarModalProps {
	onCloseModal: () => void;
	events?: Record<string, EventListener>;
}

export default class UploadAvatarModal extends Block<IUploadAvatarModalProps> {
	constructor(props: IUploadAvatarModalProps) {
		super(props);
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
