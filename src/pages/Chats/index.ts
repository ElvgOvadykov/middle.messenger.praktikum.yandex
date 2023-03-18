import Block from "@utils/Block";
import ChatItem, { IChatItemProps } from "@components/ChatItem";
import Input from "@components/Input";
import Button, { ButtonColor, ButtonSize } from "@components/Button";
import ProfileBlock from "@components/ProfileBlock";
import Message from "@components/Message";
import ChatOptionsPopup from "@components/ChatOptionsPopup";
import AttachPopup from "@components/AttachPopup";
import CreateChatModal from "@components/CreateChatModal";

import getErrors from "@utils/validation";
import { messageValidation } from "@utils/validation/validations";
import router, { Paths } from "@router/index";
import { withStore } from "@store/index";
import { getCurrentUser } from "@utils/userHelpers";

import template from "./chats.hbs";

import "./style.scss";

interface IChatsPageProps {
	isChatOptionsPopupVisible: boolean;
	isAttachPopupVisible: boolean;
	isCreateChatModalVisible: boolean;
	errors: { [key: string]: string };
	currentUser: TUser;
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

class ChatsPage extends Block<IChatsPageProps> {
	constructor() {
		super({
			isChatOptionsPopupVisible: false,
			isAttachPopupVisible: false,
			isCreateChatModalVisible: false,
			errors: {},
			currentUser: getCurrentUser(),
		});
	}

	protected init(): void {
		this.childrens.searchInput = new Input({
			lableTitle: "",
			name: "seatchChat",
			type: "text",
			placeholder: "Поиск...",
		});

		this.childrens.addChatButton = new Button({
			contentValue: "Создать чат",
			type: "button",
			size: ButtonSize.FullWith,
			events: {
				click: () => {
					const { isCreateChatModalVisible } = this.props;

					this.setProps({
						isCreateChatModalVisible: !isCreateChatModalVisible,
					});
				},
			},
		});

		this.childrens.createChatModal = new CreateChatModal({
			onCloseModal: () => this.setProps({ isCreateChatModalVisible: false }),
			events: {
				click: (event: Event) => {
					const { target } = event;

					if ((target as HTMLDivElement).matches("#addChatModal")) {
						this.setProps({ isCreateChatModalVisible: false });
					}
				},
			},
		});

		this.childrens.chats = chats.map(({ chatItem }) => new ChatItem(chatItem));

		this.childrens.profileBlock = new ProfileBlock({
			currentUser: this.props.currentUser,
			events: {
				click: () => {
					router.go(Paths.profile);
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

export default withStore((state) => ({ chats: state.chats }))(ChatsPage);
