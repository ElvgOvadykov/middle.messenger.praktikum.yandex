import Block from "@utils/Block";
import Input from "@components/Input";
import Button from "@components/Button";

import userController from "@controllers/UserController";

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
			accept: "image/*",
		});

		this.childrens.saveAvatarButton = new Button({
			contentValue: "Сохранить изменения",
			type: "button",
			events: {
				click: () => {
					this.saveAvatarHandler();
				},
			},
		});
	}

	saveAvatarHandler() {
		const input = document.querySelector("input[name='avatar']");

		const formData = new FormData();

		if (input) {
			const file = (input as HTMLInputElement).files![0];

			if (file) {
				formData.append("avatar", file, (input as HTMLInputElement).value);

				userController
					.changeUserAvatar(formData)
					.then(() => this.props.onCloseModal());
			}
		}
	}

	render() {
		return this.compile(template, this.props);
	}
}
