import Block from "@utils/Block";

import template from "./unreadMessagesCount.hbs";

import "./style.scss";

interface IUnreadMessagesProps {
  count: number;
}

export default class UnreadMessages extends Block<IUnreadMessagesProps> {
  constructor(props: IUnreadMessagesProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    if (!this.props.count) {
      return document.createDocumentFragment();
    }

    return this.compile(template, this.props);
  }
}
