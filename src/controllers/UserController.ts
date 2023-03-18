import API, { UserAPI } from "@utils/API/userAPI";

import authController from "./AuthController";

export class UserController {
	private readonly api: UserAPI;

	constructor() {
		this.api = API;
	}

	async changeUserProfile(payload: UserAPINamespace.changeUserProfile.TRequest) {
		try {
			await this.api.changeUserProfile(payload);
			authController.getUser();
		} catch (e) {
			console.log(e);
		}
	}

	async changeUserPassword(payload: UserAPINamespace.changeUserPassword.TRequest) {
		try {
			await this.api.changeUserPassword(payload);
		} catch (e) {
			console.log(e);
		}
	}

	async changeUserAvatar(payload: UserAPINamespace.changeUserAvatar.TRequest) {
		try {
			await this.api.changeUserAvatar(payload);
			authController.getUser();
		} catch (e) {
			console.log(e);
		}
	}
}

export default new UserController();
