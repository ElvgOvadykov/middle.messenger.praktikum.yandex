import Block from "@utils/Block";
import Link from "@components/Link";

import template from "./index.hbs";

export default class NotFoundErrorPage extends Block {
  init() {
    this.childrens.goToChatLink = new Link({
      linkHref: "",
      linkTitle: "Вернуться к чатам",
    })
  }

  protected render() {
    return this.compile(template, this.props);
  }
}
