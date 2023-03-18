import API, { ChatsAPI } from "@utils/API/chatsAPI";
import store from "@store/index";

export class ChatController {
	private readonly api: ChatsAPI;

	constructor() {
		this.api = API;
	}

	async getChats(payload: ChatsAPINamespace.getChats.TRequest) {
		try {
			const chats = await this.api.getChats(payload);

			store.set("chats", chats);
		} catch (e) {
			console.log(e);
		}
	}

	async createChat(payload: ChatsAPINamespace.createChat.TRequest) {
		try {
			await this.api.createChat(payload);
		} catch (e) {
			console.log(e);
		}
	}
}

export default new ChatController();
