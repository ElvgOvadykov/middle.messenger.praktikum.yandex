import Block from "@utils/Block";
import router from "@router/index";

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
		props.events = {
			click: () => {
				this.navigateTo();
			},
		};

		super(props);
	}

	navigateTo() {
		router.go(this.props.linkHref || "");
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}
