import Block from "@utils/Block";
import template from "./link.hbs";

import "./style.scss";

interface LinkProps {
	linkHref?: string;
	linkTitle: string;
	/** Временное решение для реализации переключения страниц без роутера */
	events?: Record<string, () => void>;
}

export default class Link extends Block<LinkProps> {
	constructor(props: LinkProps) {
		super(props);
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}
