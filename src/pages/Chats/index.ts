import Block from "@utils/Block";
import ChatItem, { IChatItemProps } from "@components/ChatItem";
import Input from "@components/Input";
import Button, { ButtonColor, ButtonSize } from "@components/Button";
import ProfileBlock from "@components/ProfileBlock";
import Message from "@components/Message";
import ChatOptionsPopup from "@components/ChatOptionsPopup";
import AttachPopup from "@components/AttachPopup";

import getErrors from "@utils/validation";
import { messageValidation } from "@utils/validation/validations";
import renderDOM from "@utils/renderDom";

import template from "./chats.hbs";

import "./style.scss";

interface IChatsPageProps {
	isChatOptionsPopupVisible: boolean;
	isAttachPopupVisible: boolean;
	errors: { [key: string]: string };
}

const chats: Array<{ chatItem: IChatItemProps }> = [
	{
		chatItem: {
			chatHeader: "Андрей",
			isMyLastMessage: false,
			lastMessage: "Привет как дела? Что делаешь?",
			lastMessageDate: new Date(),
			unreadMessagesCount: 0,
		},
	},
	{
		chatItem: {
			chatHeader: "Василий",
			isMyLastMessage: true,
			lastMessage: "Отлично",
			lastMessageDate: new Date(),
			unreadMessagesCount: 2,
		},
	},
];

const messages = [
	{
		content: "Привет как дела!",
		isMine: false,
	},
	{
		content: "Привет все норм!",
		isMine: true,
	},
];

export default class ChatsPage extends Block<IChatsPageProps> {
	constructor() {
		super({
			isChatOptionsPopupVisible: false,
			isAttachPopupVisible: false,
			errors: {},
		});
	}

	protected init(): void {
		this.childrens.searchInput = new Input({
			lableTitle: "",
			name: "seatchChat",
			type: "text",
			placeholder: "Поиск...",
		});

		this.childrens.chats = chats.map(({ chatItem }) => new ChatItem(chatItem));

		this.childrens.profileBlock = new ProfileBlock({
			profile: {
				firstName: "Элвг",
				secondName: "Овадыков",
			},
			events: {
				click: () => {
					renderDOM("profile");
				},
			},
		});

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

		this.childrens.messages = messages.map(
			(message) => new Message({ content: message.content, isMine: message.isMine }),
		);

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

	render() {
		return this.compile(template, { ...this.props });
	}
}
