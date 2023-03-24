import Button, { ButtonColor } from "@components/Button";
import Block from "@utils/Block";

import template from "./index.hbs";

import "./style.scss";

interface IUserForDeleteFromChatProps {
	login: string;
	deleteUserFromChatHandler: () => void;
}

export default class UserForDeleteFromChat extends Block<IUserForDeleteFromChatProps> {
	constructor(props: IUserForDeleteFromChatProps) {
		super(props);
	}

	protected init(): void {
		this.childrens.deleteButton = new Button({
			contentValue: "Удалить",
			type: "button",
			color: ButtonColor.White,
			events: {
				click: () => {
					this.props.deleteUserFromChatHandler();
				},
			},
		});
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}
