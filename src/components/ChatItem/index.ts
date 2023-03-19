import Block from "@utils/Block";
import { getCurrentPathToImg } from "@utils/helpers";

import template from "./chatItem.hbs";

import "./style.scss";

export interface IChatItemProps {
	chat: TChat;
	isSelected?: boolean;
	events?: Record<string, (event: Event) => void>;
}

type TChatItemExternalProps = IChatItemProps & {
	currentPathToAvatar: string;
};

export default class ChatItem extends Block<TChatItemExternalProps> {
	constructor(props: IChatItemProps) {
		const externalProps: TChatItemExternalProps = {
			...props,
			currentPathToAvatar: getCurrentPathToImg(props.chat.avatar),
		};

		super(externalProps);
	}

	protected init(): void {
		// this.childrens.lastMessageDate = new LastMessageDate({
		// 	date: this.props.lastMessageDate,
		// });
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}
