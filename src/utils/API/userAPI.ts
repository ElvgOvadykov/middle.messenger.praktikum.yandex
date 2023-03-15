import BaseAPI from "./baseAPI";

class UserAPI extends BaseAPI {
	changeUserProfile(payload: UserAPINamespace.changeUserProfile.TRequest) {
		return this.http.put<UserAPINamespace.changeUserProfile.TResponse>("/profile", {
			data: payload,
		});
	}

	changeUserAvatar(payload: UserAPINamespace.changeUserAvatar.TRequest) {
		return this.http.put<UserAPINamespace.changeUserAvatar.TResponse>("/profile/avatar", {
			data: payload,
		});
	}

	changeUserPassword(payload: UserAPINamespace.changeUserPassword.TRequest) {
		return this.http.put("/password", {
			data: payload,
		});
	}

	getUserById(payload: UserAPINamespace.getUserById.TRequest) {
		return this.http.get<UserAPINamespace.getUserById.TResponse>(`/password/${payload.id}`, {});
	}

	getUserByLogin(payload: UserAPINamespace.getUserByLogin.TRequest) {
		return this.http.post<UserAPINamespace.getUserByLogin.TResponse>("/search", {
			data: payload,
		});
	}
}

export default new UserAPI("/user");
