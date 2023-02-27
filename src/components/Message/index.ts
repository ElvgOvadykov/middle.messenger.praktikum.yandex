import Block from "@utils/Block";

import template from "./message.hbs";

import "./style.scss";

interface IMessageProps {
  content: string;
  isMine: boolean;
}

export default class Message extends Block<IMessageProps> {
  constructor(props: IMessageProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
