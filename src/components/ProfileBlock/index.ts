import Button, { ButtonSize, ButtonColor } from "@components/Button";
import Block from "@utils/Block";
import authController from "@controllers/AuthController";

import { getCurrentPathToImg } from "@utils/helpers";

import template from "./profileBlock.hbs";

import "./style.scss";

interface IProfileBlockProps {
	currentUser?: TUser;
	events?: Record<string, (event: Event) => void>;
	currentPathToAvatar?: string;
}

export default class ProfileBlock extends Block<IProfileBlockProps> {
	constructor(props: IProfileBlockProps) {
		const editedProps = {
			...props,
			currentPathToAvatar: getCurrentPathToImg(props.currentUser?.avatar || ""),
		};

		super(editedProps);
	}

	protected addEvents(): void {
		const { events = {} } = this.props as IProfileBlockProps;

		const block = this.element?.querySelector(".profile-block__info");

		Object.keys(events).forEach((eventName) => {
			block?.addEventListener(eventName, events[eventName]);
		});
	}

	protected removeEvents(): void {
		const { events = {} } = this.props as IProfileBlockProps;

		const block = this.element?.querySelector(".profile-block__info");

		Object.keys(events).forEach((eventName) => {
			block?.removeEventListener(eventName, events[eventName]);
		});
	}

	protected init(): void {
		this.childrens.buttonLogout = new Button({
			contentValue: "",
			type: "button",
			size: ButtonSize.Small,
			color: ButtonColor.White,
			events: {
				click: () => {
					authController.logout();
				},
			},
		});
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}
