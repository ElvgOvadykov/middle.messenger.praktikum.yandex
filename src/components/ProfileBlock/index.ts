import Button, { ButtonSize, ButtonColor } from "@components/Button";
import Block from "@utils/Block";
import router from "@utils/routes/Router";
import { Paths } from "@utils/routes/enums";

import template from "./profileBlock.hbs";

import "./style.scss";

interface IProfileBlockProps {
	profile: {
		firstName: string;
		secondName: string;
	};
	events?: Record<string, (event: Event) => void>;
}

export default class ProfileBlock extends Block<IProfileBlockProps> {
	constructor(props: IProfileBlockProps) {
		super(props);
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
					router.go(Paths.login);
				},
			},
		});
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}
