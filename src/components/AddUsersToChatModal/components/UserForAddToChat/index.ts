import Button, { ButtonColor, ButtonSize } from "@components/Button";
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
			size: ButtonSize.Medium,
			events: {
				click: () => {
					this.props.addUserToChatHander();
				},
			},
			withBorder: true,
		});
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}
