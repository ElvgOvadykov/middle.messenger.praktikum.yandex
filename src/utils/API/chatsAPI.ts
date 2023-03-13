import HTTPTransport from "@utils/HTTPTransport";

const httpTransport = new HTTPTransport("/chats");

class ChatsAPI {
	getChats(payload: ChatsAPINamespace.getChats.TRequest) {
		return httpTransport.get("", {
			data: payload,
		}) as Promise<ChatsAPINamespace.getChats.TResponse>;
	}

	createChat(payload: ChatsAPINamespace.createChat.TRequest) {
		return httpTransport.post("", {
			data: payload,
		});
	}

	deleteChat(payload: ChatsAPINamespace.deleteChat.TRequest) {
		return httpTransport.delete("", {
			data: payload,
		}) as Promise<ChatsAPINamespace.deleteChat.TResponse>;
	}

	addUsersToChat(payload: ChatsAPINamespace.addUsersToChat.TRequest) {
		return httpTransport.put("/users", { data: payload });
	}

	deleteUsersFromChat(payload: ChatsAPINamespace.deleteUsersFromChat.TRequest) {
		return httpTransport.delete("/users", { data: payload });
	}
}

export default new ChatsAPI();
