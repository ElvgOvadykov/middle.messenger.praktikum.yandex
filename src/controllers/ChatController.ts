import API, { ChatsAPI } from "@utils/API/chatsAPI";
import store from "@store/index";
import errorController from "./ErrorController";

export class ChatController {
	private readonly api: ChatsAPI;

	constructor() {
		this.api = API;
	}

	async getChats(payload: ChatsAPINamespace.getChats.TRequest) {
		try {
			const chats = await this.api.getChats(payload);

			store.set("chats", chats);
		} catch (e: any) {
			errorController.setError(e);
		}
	}

	async createChat(payload: ChatsAPINamespace.createChat.TRequest) {
		try {
			await this.api.createChat(payload);
			await this.getChats({});
		} catch (e: any) {
			errorController.setError(e);
		}
	}

	selectChat(chatId?: number) {
		try {
			store.set("selectedChatId", chatId);
		} catch (e: any) {
			errorController.setError(e);
		}
	}

	async deleteChat(chatId: number) {
		this.api.deleteChat({ chatId }).then(() => {
			this.selectChat(undefined);
			this.getChats({});
		});
	}

	async uploadChatAvatar(payload: FormData) {
		this.api.uploadChatAvatar(payload).then(() => {
			this.getChats({});
		});
	}

	async addUsersToChat(payload: ChatsAPINamespace.addUsersToChat.TRequest) {
		this.api
			.addUsersToChat(payload)
			.then(() => store.set("foundUsers", undefined))
			.catch((e) => errorController.setError(e));
	}

	async getChatUsers(payload: ChatsAPINamespace.getChatUsers.TRequest) {
		this.api
			.getChatUsers(payload)
			.then((users) => store.set("chatUsers", users))
			.catch((e) => errorController.setError(e));
	}

	async deleteUserFromChat(
		payload: ChatsAPINamespace.deleteUsersFromChat.TRequest,
	) {
		this.api
			.deleteUsersFromChat(payload)
			.then(() => store.set("chatUsers", []))
			.catch((e) => errorController.setError(e));
	}
}

export default new ChatController();
