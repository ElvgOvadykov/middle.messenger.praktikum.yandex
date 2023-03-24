import Button, { ButtonColor } from "@components/Button";
import Input from "@components/Input";
import Block from "@utils/Block";

import userController from "@controllers/UserController";
import chatController from "@controllers/ChatController";
import store, { StoreEvents } from "@store/index";

import UserForAddToChat from "./components/UserForAddToChat";

import template from "./index.hbs";

import "./style.scss";

interface IAddUsersToChatModalProps {
	chatId: number;
	onClose: () => void;
	events?: Record<string, EventListener>;
}

type TAddUsersToChatModalExtendsProps = IAddUsersToChatModalProps & {
	foundUsers: Array<TUser>;
};

export default class AddUsersToChatModal extends Block<TAddUsersToChatModalExtendsProps> {
	constructor(props: IAddUsersToChatModalProps) {
		const extendedProps: TAddUsersToChatModalExtendsProps = {
			...props,
			foundUsers: [],
		};

		super(extendedProps);

		store.on(StoreEvents.Updated, () => {
			this.setProps(store.getState());
		});
	}

	protected init(): void {
		this.childrens.login = new Input({
			name: "login",
			type: "text",
			lableTitle: "Логин",
		});

		this.childrens.searchUsersButton = new Button({
			contentValue: "Поиск",
			type: "button",
			color: ButtonColor.White,
			events: {
				click: () => {
					this.searchUsersHandler();
				},
			},
		});
	}

	searchUsersHandler() {
		const data = (this.childrens.login as Input).value;

		userController.getUserByLogin({ login: data });
	}

	componentDidUpdate(
		oldProps: TAddUsersToChatModalExtendsProps,
		newProps: TAddUsersToChatModalExtendsProps,
	) {
		if (newProps.foundUsers && newProps.foundUsers.length) {
			this.childrens.users = newProps.foundUsers.map(
				(user) =>
					new UserForAddToChat({
						login: user.login,
						addUserToChatHander: () => {
							chatController
								.addUsersToChat({
									chatId: newProps.chatId,
									users: [user.id],
								})
								.then(() => this.props.onClose());
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
