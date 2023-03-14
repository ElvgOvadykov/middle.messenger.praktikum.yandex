import BaseAPI from "./baseAPI";

class UserAPI extends BaseAPI {
	changeUserProfile(payload: UserAPINamespace.changeUserProfile.TRequest) {
		return this.http.put("/profile", {
			data: payload,
		}) as Promise<UserAPINamespace.changeUserProfile.TResponse>;
	}

	changeUserAvatar(payload: UserAPINamespace.changeUserAvatar.TRequest) {
		return this.http.put("/profile/avatar", {
			data: payload,
		}) as Promise<UserAPINamespace.changeUserAvatar.TResponse>;
	}

	changeUserPassword(payload: UserAPINamespace.changeUserPassword.TRequest) {
		return this.http.put("/password", {
			data: payload,
		});
	}

	getUserById(payload: UserAPINamespace.getUserById.TRequest) {
		return this.http.get(
			`/password/${payload.id}`,
			{},
		) as Promise<UserAPINamespace.getUserById.TResponse>;
	}

	getUserByLogin(payload: UserAPINamespace.getUserByLogin.TRequest) {
		return this.http.post("/search", {
			data: payload,
		}) as Promise<UserAPINamespace.getUserByLogin.TResponse>;
	}
}

export default new UserAPI("/user");
