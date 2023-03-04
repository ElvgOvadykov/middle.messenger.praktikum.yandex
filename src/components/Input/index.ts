import Block from "@utils/Block";
import template from "./input.hbs";

import "./style.scss";

interface InputProps {
	name: string;
	lableTitle?: string;
	type: string;
	placeholder?: string;
	error?: string;
	events?: Record<string, EventListener>;
}

export default class Input extends Block<InputProps> {
	constructor(props: InputProps) {
		super(props);
	}

	protected addEvents() {
		const { events = {} } = this.props as InputProps;

		const input = this.element?.querySelector(`input#${this.props.name}`);

		Object.keys(events).forEach((eventName) => {
			input?.addEventListener(eventName, events[eventName]);
		});
	}

	protected removeEvents(): void {
		const { events = {} } = this.props as InputProps;

		const input = this.element?.querySelector(`input#${this.props.name}`);

		Object.keys(events).forEach((eventName) => {
			input?.removeEventListener(eventName, events[eventName]);
		});
	}

	get name(): string {
		return this.props.name;
	}

	get value(): string {
		const input = this.element?.querySelector(`input#${this.props.name}`);

		return (input as HTMLInputElement).value;
	}

	setValue(value: string) {
		const input = this.element?.querySelector(`input#${this.props.name}`);

		(input as HTMLInputElement).value = value;
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}
