import Block from "@utils/Block";
import LastMessage from "./components/LastMessage";
import LastMessageDate from "./components/LastMessageDate";
import UnreadMessages from "./components/UnreadMessages";

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

    if (this.props.unreadMessagesCount) {
      this.childrens.unreadMessages = new UnreadMessages({
        count: this.props.unreadMessagesCount,
      });
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
