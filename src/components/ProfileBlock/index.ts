import Button, { ButtonSize, ButtonColor } from "@components/Button";
import Block from "@utils/Block";

import getGoToPageFunction from "@utils/getGoToPageFunction";
import renderDOM from "@utils/renderDom";

import template from "./profileBlock.hbs";

import "./style.scss";

interface IProfileBlockProps {
	profile: {
		firstName: string;
		secondName: string;
	};
}

export default class ProfileBlock extends Block<IProfileBlockProps> {
	constructor(props: IProfileBlockProps) {
		super(props);
	}

	protected init(): void {
		this.childrens.buttonLogout = new Button({
			contentValue: "",
			type: "button",
			size: ButtonSize.Small,
			color: ButtonColor.White,
			events: {
				click: getGoToPageFunction("login"),
			},
		});
	}

	componentDidMount(): void {
		const block = document.querySelector(".profile-block__info");

		block?.addEventListener("click", (event: Event) => {
			renderDOM("profile");
		});
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}
