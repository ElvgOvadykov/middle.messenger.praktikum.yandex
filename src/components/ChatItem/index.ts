import Block from "@utils/Block";
import LastMessageDate from "./components/LastMessageDate";

import template from "./chatItem.hbs";

import "./style.scss";

export interface IChatItemProps {
  chatHeader: string;
  lastMessage: string;
  isMyLastMessage: boolean;
  unreadMessagesCount: number;
  lastMessageDate: Date;
}

export default class ChatItem extends Block<IChatItemProps> {
  constructor(props: IChatItemProps) {
    super(props);
  }

  protected init(): void {
    this.childrens.lastMessageDate = new LastMessageDate({
      date: this.props.lastMessageDate,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
