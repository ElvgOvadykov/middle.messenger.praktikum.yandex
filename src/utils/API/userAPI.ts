import HTTPTransport from "@utils/HTTPTransport";

const httpTransport = new HTTPTransport("/user");

class UserAPI {
	changeUserProfile(payload: UserAPINamespace.changeUserProfile.TRequest) {
		return httpTransport.put("/profile", {
			data: payload,
		}) as Promise<UserAPINamespace.changeUserProfile.TResponse>;
	}

	changeUserAvatar(payload: UserAPINamespace.changeUserAvatar.TRequest) {
		return httpTransport.put("/profile/avatar", {
			data: payload,
		}) as Promise<UserAPINamespace.changeUserAvatar.TResponse>;
	}

	changeUserPassword(payload: UserAPINamespace.changeUserPassword.TRequest) {
		return httpTransport.put("/password", {
			data: payload,
		});
	}

	getUserById(payload: UserAPINamespace.getUserById.TRequest) {
		return httpTransport.get(
			`/password/${payload.id}`,
			{},
		) as Promise<UserAPINamespace.getUserById.TResponse>;
	}

	getUserByLogin(payload: UserAPINamespace.getUserByLogin.TRequest) {
		return httpTransport.post("/search", {
			data: payload,
		}) as Promise<UserAPINamespace.getUserByLogin.TResponse>;
	}
}

export default new UserAPI();
