import Block from "@utils/Block";
import Link from "@components/Link";

import getGoToPageFunction from "@utils/getGoToPageFunction";

import template from "./index.hbs";

import "./style.scss";

export default class HomePage extends Block {
	init() {
		this.childrens.signUpPageLink = new Link({
			linkHref: "",
			linkTitle: "Регистрация",
			events: {
				click: getGoToPageFunction("signUp"),
			},
		});

		this.childrens.loginPageLink = new Link({
			linkHref: "",
			linkTitle: "Авторизация",
			events: {
				click: getGoToPageFunction("login"),
			},
		});

		this.childrens.profilePageLink = new Link({
			linkHref: "",
			linkTitle: "Профиль",
			events: {
				click: getGoToPageFunction("profile"),
			},
		});

		this.childrens.notFoundPageLink = new Link({
			linkHref: "",
			linkTitle: "404 ошибка",
			events: {
				click: getGoToPageFunction("notFound"),
			},
		});

		this.childrens.serverErrorPageLink = new Link({
			linkHref: "",
			linkTitle: "5XX ошибка",
			events: {
				click: getGoToPageFunction("serverError"),
			},
		});

		this.childrens.chatsPageLink = new Link({
			linkHref: "",
			linkTitle: "Чаты",
			events: {
				click: getGoToPageFunction("chats"),
			},
		});
	}

	protected render() {
		return this.compile(template, this.props);
	}
}
