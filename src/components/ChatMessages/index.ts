import Block from "@utils/Block";
import Button, { ButtonColor, ButtonSize } from "@components/Button";
import Input from "@components/Input";

import ChatOptionsPopup from "@components/ChatOptionsPopup";
import AttachPopup from "@components/AttachPopup";

import getErrors from "@utils/validation";
import { messageValidation } from "@utils/validation/validations";

import template from "./index.hbs";

interface IChatMessagesProps {
	chat?: TChat;
}

type TChatMessagesExtendedProps = IChatMessagesProps & {
	isChatOptionsPopupVisible: boolean;
	isAttachPopupVisible: boolean;
};

export default class ChatMessages extends Block<TChatMessagesExtendedProps> {
	constructor(props: IChatMessagesProps) {
		const extendedProps: TChatMessagesExtendedProps = {
			...props,
			isAttachPopupVisible: false,
			isChatOptionsPopupVisible: false,
		};

		super(extendedProps);
	}

	protected init(): void {
		this.childrens.chatOptionsButton = new Button({
			type: "button",
			contentValue: "",
			color: ButtonColor.White,
			size: ButtonSize.Small,
			id: "toggleIsChatOptionsVisibleButton",
			events: {
				click: () => {
					const { isChatOptionsPopupVisible } = this.props;

					this.setProps({
						isChatOptionsPopupVisible: !isChatOptionsPopupVisible,
					});
				},
			},
		});

		this.childrens.attachButton = new Button({
			type: "button",
			contentValue: "",
			color: ButtonColor.White,
			size: ButtonSize.Small,
			id: "attachButton",
			events: {
				click: () => {
					const { isAttachPopupVisible } = this.props;

					this.setProps({
						isAttachPopupVisible: !isAttachPopupVisible,
					});
				},
			},
		});

		this.childrens.message = new Input({
			name: "message",
			lableTitle: "",
			type: "text",
			placeholder: "Сообщение",
		});

		this.childrens.sendMessageButton = new Button({
			type: "button",
			contentValue: "",
			size: ButtonSize.Small,
			id: "sendMessage",
			events: {
				click: () => {
					this.sendMessageHandler();
				},
			},
		});

		// this.childrens.messages = messages.map(
		// 	(message) => new Message({ content: message.content, isMine: message.isMine }),
		// );

		this.childrens.chatOptionsPopup = new ChatOptionsPopup({});

		this.childrens.attachPopup = new AttachPopup({});
	}

	sendMessageHandler() {
		const input = this.childrens.message as Input;

		const data = { message: input.value };

		const errors = getErrors(data, { message: messageValidation });

		if (!errors.message) {
			console.log(data);
		}

		input.setProps({ error: errors.message });
	}

	protected render(): DocumentFragment {
		if (!this.props.chat) {
			return new DocumentFragment();
		}

		return this.compile(template, this.props);
	}
}
