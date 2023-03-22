import Button, { ButtonColor } from "@components/Button";
import Block from "@utils/Block";

import template from "./index.hbs";

import "./style.scss";

interface IUserForAddToChatProps {
	login: string;
	addUserToChatHander: () => void;
}

export default class UserForAddToChat extends Block<IUserForAddToChatProps> {
	constructor(props: IUserForAddToChatProps) {
		super(props);
	}

	protected init(): void {
		this.childrens.addButton = new Button({
			contentValue: "Добавить",
			type: "button",
			color: ButtonColor.White,
			events: {
				click: () => {
					this.props.addUserToChatHander();
				},
			},
		});
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}
