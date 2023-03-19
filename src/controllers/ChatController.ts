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

	selectChat(chatId: number) {
		try {
			store.set("selectedChat", chatId);
		} catch (e: any) {
			errorController.setError(e);
		}
	}
}

export default new ChatController();
