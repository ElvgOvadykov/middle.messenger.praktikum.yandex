import Button, { ButtonColor, ButtonSize } from "@components/Button";
import withStore from "@store/withStore";
import Block from "@utils/Block";
import errorController from "@controllers/ErrorController";

import template from "./index.hbs";

import "./style.scss";

interface IErrorMessageProps {
	responseError?: TAPIError;
}

class ErrorMessage extends Block<IErrorMessageProps> {
	constructor() {
		super({});
	}

	protected init(): void {
		this.childrens.closeButton = new Button({
			type: "button",
			contentValue: "",
			color: ButtonColor.White,
			size: ButtonSize.Small,
			id: "closeErrorMessageButton",
			events: {
				click: () => {
					errorController.deleteError();
				},
			},
		});
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}

export default withStore((state) => ({ responseError: state.responseError }))(ErrorMessage);
