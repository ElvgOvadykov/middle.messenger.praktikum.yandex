import BaseAPI from "./baseAPI";

export class ChatsAPI extends BaseAPI {
	getChats(payload: ChatsAPINamespace.getChats.TRequest) {
		return this.http.get<ChatsAPINamespace.getChats.TResponse>("", {
			data: payload,
		});
	}

	createChat(payload: ChatsAPINamespace.createChat.TRequest) {
		return this.http.post("", {
			data: payload,
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		});
	}

	deleteChat(payload: ChatsAPINamespace.deleteChat.TRequest) {
		return this.http.delete<ChatsAPINamespace.deleteChat.TResponse>("", {
			data: payload,
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		});
	}

	addUsersToChat(payload: ChatsAPINamespace.addUsersToChat.TRequest) {
		return this.http.put("/users", { data: payload });
	}

	deleteUsersFromChat(payload: ChatsAPINamespace.deleteUsersFromChat.TRequest) {
		return this.http.delete("/users", { data: payload });
	}

	uploadChatAvatar(payload: FormData) {
		return this.http.put("/avatar", {
			data: payload,
		});
	}
}

export default new ChatsAPI("/chats");
