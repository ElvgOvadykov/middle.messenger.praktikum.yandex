import BaseAPI from "./baseAPI";

class ChatsAPI extends BaseAPI {
	getChats(payload: ChatsAPINamespace.getChats.TRequest) {
		return this.http.get("", {
			data: payload,
		}) as Promise<ChatsAPINamespace.getChats.TResponse>;
	}

	createChat(payload: ChatsAPINamespace.createChat.TRequest) {
		return this.http.post("", {
			data: payload,
		});
	}

	deleteChat(payload: ChatsAPINamespace.deleteChat.TRequest) {
		return this.http.delete("", {
			data: payload,
		}) as Promise<ChatsAPINamespace.deleteChat.TResponse>;
	}

	addUsersToChat(payload: ChatsAPINamespace.addUsersToChat.TRequest) {
		return this.http.put("/users", { data: payload });
	}

	deleteUsersFromChat(payload: ChatsAPINamespace.deleteUsersFromChat.TRequest) {
		return this.http.delete("/users", { data: payload });
	}
}

export default new ChatsAPI("/chats");
