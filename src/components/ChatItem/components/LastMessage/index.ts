import Block from "@utils/Block";

import template from "./lastMessage.hbs";
import templateWithYou from "./lastMessageWithYou.hbs";

import "./style.scss";

interface ILastMessageProps {
  lastMessage: string;
  isMyLastMessage: boolean;
}

export default class LastMessage extends Block<ILastMessageProps> {
  constructor(props: ILastMessageProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    if (this.props.isMyLastMessage) {
      return this.compile(templateWithYou, this.props);
    }

    return this.compile(template, this.props);
  }
}
