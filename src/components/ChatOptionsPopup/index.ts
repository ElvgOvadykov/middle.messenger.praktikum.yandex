import Button, { ButtonColor } from "@components/Button";
import Block from "@utils/Block";

import template from "./chatOptionsPopup.hbs";

import "./style.scss";

export default class ChatOptionsPopup extends Block {
	protected init(): void {
		this.childrens.addMemberButton = new Button({
			contentValue: "Добавить пользователя",
			type: "button",
			color: ButtonColor.White,
		});

		this.childrens.deleteMemberButton = new Button({
			contentValue: "Удалить пользователя",
			type: "button",
			color: ButtonColor.White,
		});
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}
