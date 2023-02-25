import Block from "@utils/Block";
import ChatItem, { IChatItemProps } from "@components/ChatItem";
import Input from "@components/Input";

import template from "./chats.hbs";

import "./style.scss";

const chats: Array<{ chatItem: IChatItemProps }> = [
  {
    chatItem: {
      chatHeader: "Андрей",
      isMyLastMessage: false,
      lastMessage: "Привет как дела? Что делаешь?",
      lastMessageDate: new Date(),
      unreadMessagesCount: 0,
    },
  },
  {
    chatItem: {
      chatHeader: "Василий",
      isMyLastMessage: true,
      lastMessage: "Отлично",
      lastMessageDate: new Date(),
      unreadMessagesCount: 2,
    },
  },
];

export default class ChatsPage extends Block {
  protected init(): void {
    this.childrens.searchInput = new Input({
      lableTitle: "",
      name: "seatchChat",
      type: "text",
      placeholder: "Поиск..."
    })

    this.childrens.chats = chats.map(({ chatItem }) => new ChatItem(chatItem));
  }

  render() {
    return this.compile(template, this.props);
  }
}
