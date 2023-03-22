import Block from "@utils/Block";
import Button, { ButtonColor, ButtonSize } from "@components/Button";
import Input from "@components/Input";

import ChatOptionsPopup from "@components/ChatOptionsPopup";
import AttachPopup from "@components/AttachPopup";
import UploadChatAvatarModal from "@components/UploadChatAvatarModal";

import getErrors from "@utils/validation";
import { messageValidation } from "@utils/validation/validations";
import { getCurrentPathToImg } from "@utils/helpers";

import template from "./index.hbs";

import "./style.scss";

interface IChatMessagesProps {
	chat?: TChat;
}

type TChatMessagesExtendedProps = IChatMessagesProps & {
	isChatOptionsPopupVisible: boolean;
	isAttachPopupVisible: boolean;
	isUploadChatAvatarModalVisible: boolean;
	pathToAvatar: string;
};

export default class ChatMessages extends Block<TChatMessagesExtendedProps> {
	constructor(props: IChatMessagesProps) {
		const extendedProps: TChatMessagesExtendedProps = {
			...props,
			isAttachPopupVisible: false,
			isChatOptionsPopupVisible: false,
			isUploadChatAvatarModalVisible: false,
			pathToAvatar: getCurrentPathToImg(props.chat?.avatar || ""),
		};

		super(extendedProps);
	}

	protected init(): void {
		this.childrens.chatOptionsButton = new Button({
			type: "button",
			contentValue: "",
			color: ButtonColor.White,
			size: ButtonSize.Small,
			id: "toggleIsChatOptionsVisibleButton",
			events: {
				click: () => {
					this.toggleChatOptions();
				},
			},
		});

		this.childrens.attachButton = new Button({
			type: "button",
			contentValue: "",
			color: ButtonColor.White,
			size: ButtonSize.Small,
			id: "attachButton",
			events: {
				click: () => {
					const { isAttachPopupVisible } = this.props;

					this.setProps({
						isAttachPopupVisible: !isAttachPopupVisible,
					});
				},
			},
		});

		this.childrens.message = new Input({
			name: "message",
			lableTitle: "",
			type: "text",
			placeholder: "Сообщение",
		});

		this.childrens.sendMessageButton = new Button({
			type: "button",
			contentValue: "",
			size: ButtonSize.Small,
			id: "sendMessage",
			events: {
				click: () => {
					this.sendMessageHandler();
				},
			},
		});

		// this.childrens.messages = messages.map(
		// 	(message) => new Message({ content: message.content, isMine: message.isMine }),
		// );

		this.childrens.chatOptionsPopup = new ChatOptionsPopup({
			chat: this.props.chat,
			onClose: () => {
				this.toggleChatOptions();
			},
			onUploadChatAvatarModalToggle: () => {
				this.toggleUploadChatAvatar();
			},
		});

		this.childrens.attachPopup = new AttachPopup({});

		this.childrens.uploadChatAvatarModal = new UploadChatAvatarModal({
			onCloseModal: () => {
				this.toggleUploadChatAvatar();
			},
			chatId: this.props.chat?.id,
			events: {
				click: (event: Event) => {
					const { target } = event;

					if ((target as HTMLDivElement).matches("#uploadChatAvatarModal")) {
						this.toggleUploadChatAvatar();
					}
				},
			},
		});
	}

	toggleChatOptions() {
		const { isChatOptionsPopupVisible } = this.props;

		this.setProps({
			isChatOptionsPopupVisible: !isChatOptionsPopupVisible,
		});
	}

	toggleUploadChatAvatar() {
		const { isUploadChatAvatarModalVisible } = this.props;

		this.setProps({
			isUploadChatAvatarModalVisible: !isUploadChatAvatarModalVisible,
		});
	}

	sendMessageHandler() {
		const input = this.childrens.message as Input;

		const data = { message: input.value };

		const errors = getErrors(data, { message: messageValidation });

		if (!errors.message) {
			console.log(data);
		}

		input.setProps({ error: errors.message });
	}

	componentDidUpdate(
		oldProps: IChatMessagesProps,
		newProps: IChatMessagesProps,
	): boolean {
		if (newProps.chat) {
			(this.childrens.chatOptionsPopup as ChatOptionsPopup).setProps({
				chat: newProps.chat,
			});

			(this.childrens.uploadChatAvatarModal as UploadChatAvatarModal).setProps({
				chatId: newProps.chat.id,
			});
		}

		return true;
	}

	protected render(): DocumentFragment {
		if (!this.props.chat) {
			return new DocumentFragment();
		}

		return this.compile(template, {
			...this.props,
			pathToAvatar: getCurrentPathToImg(this.props.chat.avatar || ""),
		});
	}
}
