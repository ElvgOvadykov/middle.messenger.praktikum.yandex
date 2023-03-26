import Block from "@utils/Block";
import chatController from "@controllers/ChatController";
import store, { StoreEvents } from "@store/index";

import Button from "@components/Button";

import UserForDeleteFromChat from "./components/UserForDeleteFromChat";

import template from "./index.hbs";

import "./style.scss";

interface IDeleteUsersFromChatModalProps {
	chatId: number;
	events?: Record<string, EventListener>;
}

type TDeleteUsersFromChatModalExtendedProps = IDeleteUsersFromChatModalProps & {
	chatUsers: Array<TUser>;
};

class DeleteUsersFromChatModal extends Block<TDeleteUsersFromChatModalExtendedProps> {
	constructor(props: IDeleteUsersFromChatModalProps) {
		const extendedProps: TDeleteUsersFromChatModalExtendedProps = {
			...props,
			chatUsers: [],
		};

		super(extendedProps);

		store.on(StoreEvents.Updated, () => {
			this.setProps(store.getState());
		});
	}

	protected init(): void {
		this.childrens.searchButton = new Button({
			contentValue: "Найти пользователей чата",
			type: "button",
			events: {
				click: () => {
					chatController.getChatUsers({ id: this.props.chatId });
				},
			},
		});
	}

	componentDidUpdate(
		oldProps: TDeleteUsersFromChatModalExtendedProps,
		newProps: TDeleteUsersFromChatModalExtendedProps,
	) {
		if (newProps.chatUsers && newProps.chatUsers.length) {
			this.childrens.users = newProps.chatUsers.map(
				(user) =>
					new UserForDeleteFromChat({
						login: user.login,
						deleteUserFromChatHandler: () => {
							chatController
								.deleteUserFromChat({
									chatId: newProps.chatId,
									users: [user.id],
								})
								.then(() =>
									chatController.getChatUsers({ id: newProps.chatId }),
								);
						},
					}),
			);
		}

		return true;
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}

export default DeleteUsersFromChatModal;
