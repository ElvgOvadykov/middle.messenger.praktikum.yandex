import Block from "@utils/Block";
import Input from "@components/Input";
import Button from "@components/Button";

import chatController from "@controllers/ChatController";

import template from "./index.hbs";

import "./style.scss";

interface IUploadChatAvatarModalProps {
	chatId?: number;
	onCloseModal: () => void;
	events?: Record<string, EventListener>;
}

export default class UploadChatAvatarModal extends Block<IUploadChatAvatarModalProps> {
	constructor(props: IUploadChatAvatarModalProps) {
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

			if (file && this.props.chatId) {
				formData.append("chatId", String(this.props.chatId));
				formData.append("avatar", file, (input as HTMLInputElement).value);

				chatController.uploadChatAvatar(formData).then(() => {
					this.props.onCloseModal();
				});
			}
		}
	}

	render() {
		return this.compile(template, this.props);
	}
}
