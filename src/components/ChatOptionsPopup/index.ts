import Button, { ButtonColor } from "@components/Button";
import Block from "@utils/Block";

import chatController from "@controllers/ChatController";

import template from "./chatOptionsPopup.hbs";

import "./style.scss";

interface IChatOptionsPopupProps {
	chat?: TChat;
	onClose: () => void;
}

export default class ChatOptionsPopup extends Block<IChatOptionsPopupProps> {
	constructor(props: IChatOptionsPopupProps) {
		super(props);
	}

	protected init(): void {
		this.childrens.addMemberButton = new Button({
			contentValue: "Добавить пользователя",
			type: "button",
			color: ButtonColor.White,
		});

		this.childrens.deleteMemberButton = new Button({
			contentValue: "Удалить пользователя",
			type: "button",
			color: ButtonColor.White,
		});

		this.childrens.deleteChatButton = new Button({
			contentValue: "Удалить чат",
			type: "button",
			color: ButtonColor.White,
			events: {
				click: () => {
					console.log(this.props.chat);
					if (this.props.chat) {
						chatController
							.deleteChat(this.props.chat.id)
							.then(() => this.props.onClose());
					}
				},
			},
		});
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}
