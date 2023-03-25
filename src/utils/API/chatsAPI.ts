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
		return this.http.put("/users", {
			data: payload,
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		});
	}

	deleteUsersFromChat(payload: ChatsAPINamespace.deleteUsersFromChat.TRequest) {
		return this.http.delete("/users", {
			data: payload,
			headers: { "Content-Type": "application/json; charset=UTF-8" },
		});
	}

	uploadChatAvatar(payload: FormData) {
		return this.http.put("/avatar", {
			data: payload,
		});
	}

	getChatUsers(payload: ChatsAPINamespace.getChatUsers.TRequest) {
		return this.http.get<Array<TUser>>(`/${payload.id}/users`, {
			data: { ...payload, id: undefined },
		});
	}

	getChatToken(payload: ChatsAPINamespace.getChatToken.TRequest) {
		return this.http.post<ChatsAPINamespace.getChatToken.TResponse>(
			`/token/${payload.id}`,
			{},
		);
	}
}

export default new ChatsAPI("/chats");
