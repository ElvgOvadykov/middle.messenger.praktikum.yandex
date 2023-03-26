import Block from "@utils/Block";
import Input from "@components/Input";
import Button from "@components/Button";

import chatController from "@controllers/ChatController";

import template from "./index.hbs";

interface ICreateChatModalProps {
	onCloseModal: () => void;
	events?: Record<string, EventListener>;
}

export default class CreateChatModal extends Block<ICreateChatModalProps> {
	constructor(props: ICreateChatModalProps) {
		super(props);
	}

	protected init(): void {
		this.childrens.title = new Input({
			name: "title",
			type: "text",
			lableTitle: "Название чата",
		});

		this.childrens.addChatButton = new Button({
			contentValue: "Создать чат",
			type: "button",
			events: {
				click: () => {
					this.submitHandler();
				},
			},
		});
	}

	submitHandler() {
		const title = (this.childrens.title as Input).value;

		const payload: ChatsAPINamespace.createChat.TRequest = {
			title,
		};

		chatController.createChat(payload).then(() => this.props.onCloseModal());
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}
