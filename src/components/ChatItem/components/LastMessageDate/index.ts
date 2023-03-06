import Block from "@utils/Block";

import template from "./lastMessageDate.hbs";

import "./style.scss";

interface ILastMessageDateProps {
	date: Date;
}

type ILastMessageDateExtendedProps = ILastMessageDateProps & {
	dateText: string;
};

export default class LastMessageDate extends Block<ILastMessageDateExtendedProps> {
	constructor(props: ILastMessageDateProps) {
		let dateText = "";
		const today = new Date();

		const { date } = props;

		if (props.date.toDateString() === today.toDateString()) {
			dateText = `${date.getHours()}:${date.getMinutes()}`;
		} else {
			dateText = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
		}

		const extentedProps: ILastMessageDateExtendedProps = {
			date: props.date,
			dateText,
		};

		super(extentedProps);
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}
