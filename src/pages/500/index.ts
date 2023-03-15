import Block from "@utils/Block";
import Link from "@components/Link";

import { Paths } from "@router/index";

import template from "./index.hbs";

export default class ServerErrorPage extends Block {
	init() {
		this.childrens.goToChatLink = new Link({
			linkHref: Paths.chats,
			linkTitle: "Вернуться к чатам",
		});
	}

	protected render() {
		return this.compile(template, this.props);
	}
}
