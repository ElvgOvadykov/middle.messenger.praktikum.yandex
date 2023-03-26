import API, { UserAPI } from "@utils/API/userAPI";
import store from "@store/index";

import authController from "./AuthController";
import errorController from "./ErrorController";

export class UserController {
	private readonly api: UserAPI;

	constructor() {
		this.api = API;
	}

	async changeUserProfile(
		payload: UserAPINamespace.changeUserProfile.TRequest,
	) {
		try {
			await this.api.changeUserProfile(payload);
			authController.getUser();
		} catch (e: any) {
			errorController.setError(e);
		}
	}

	async changeUserPassword(
		payload: UserAPINamespace.changeUserPassword.TRequest,
	) {
		try {
			await this.api.changeUserPassword(payload);
		} catch (e: any) {
			errorController.setError(e);
		}
	}

	async changeUserAvatar(payload: UserAPINamespace.changeUserAvatar.TRequest) {
		try {
			await this.api.changeUserAvatar(payload);
			authController.getUser();
		} catch (e: any) {
			errorController.setError(e);
		}
	}

	async getUserByLogin(payload: UserAPINamespace.getUserByLogin.TRequest) {
		this.api
			.getUserByLogin(payload)
			.then((users) => store.set("foundUsers", users))
			.catch((e) => errorController.setError(e));
	}
}

export default new UserController();
