import Block from "@utils/Block";
import ChatItem, { IChatItemProps } from "@components/ChatItem";
import Input from "@components/Input";
import Button, { ButtonColor, ButtonSize } from "@components/Button";
import ProfileBlock from "@components/ProfileBlock";
import CreateChatModal from "@components/CreateChatModal";
import ErrorMessage from "@components/ErrorMessage";
import ChatMessages from "@components/ChatMessages";

import getErrors from "@utils/validation";
import { messageValidation } from "@utils/validation/validations";
import router, { Paths } from "@router/index";
import store, { withStore } from "@store/index";
import { getCurrentUser } from "@utils/userHelpers";
import chatController from "@controllers/ChatController";
import { isEqual } from "@utils/helpers";

import template from "./chats.hbs";

import "./style.scss";

interface IChatsPageProps {
	isCreateChatModalVisible: boolean;
	errors: { [key: string]: string };
	currentUser: TUser;
	selectedChatId?: number;
	chats: Array<TChat>;
}

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
			isCreateChatModalVisible: false,
			errors: {},
			currentUser: getCurrentUser(),
			chats: [],
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

		this.childrens.profileBlock = new ProfileBlock({
			currentUser: this.props.currentUser,
			events: {
				click: () => {
					router.go(Paths.profile);
				},
			},
		});

		this.childrens.chatMessages = new ChatMessages({});

		this.childrens.errorMessage = new ErrorMessage({});
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

	componentDidMount(): void {
		chatController.getChats({});
	}

	componentDidUpdate(oldProps: IChatsPageProps, newProps: IChatsPageProps): boolean {
		const bool = isEqual(oldProps, newProps);

		if (!bool) {
			const newChats = Array.from(newProps.chats);

			this.childrens.chatList = [];
			this.childrens.chatList = newChats.map(
				(chat) =>
					new ChatItem({
						chat,
						events: {
							click: () => {
								chatController.selectChat(chat.id);
							},
						},
						isSelected: chat.id === newProps.selectedChatId,
					}),
			);

			(this.childrens.chatMessages as ChatMessages).setProps({
				// chat: newChats.find((item) => item.id === newProps.selectedChatId),
				// chat: oldProps.chats.find((item) => item.id === newProps.selectedChatId),
			});
		}

		return !bool;
	}

	render() {
		return this.compile(template, { ...this.props });
	}
}

export default withStore((state) => state)(ChatsPage);
