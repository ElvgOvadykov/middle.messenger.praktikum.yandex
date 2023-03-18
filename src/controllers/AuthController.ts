import API, { AuthAPI } from "@utils/API/authAPI";
import { setCurrentUser, deleteCurrentUser } from "@utils/userHelpers";
import router, { Paths } from "@router/index";

import errorController from "./ErrorController";

export class AuthController {
	private readonly api: AuthAPI;

	constructor() {
		this.api = API;
	}

	async signIn(payload: AuthAPINamespace.signIn.TRequest) {
		try {
			await this.api.signIn(payload);

			await this.getUser();

			router.go(Paths.chats);
		} catch (e: any) {
			errorController.setError(e);
		}
	}

	async signUp(payload: AuthAPINamespace.signUp.TRequest) {
		try {
			await this.api.signUp(payload);

			await this.getUser();

			router.go(Paths.chats);
		} catch (e: any) {
			errorController.setError(e);
		}
	}

	async getUser() {
		try {
			const user = await this.api.getUser();

			setCurrentUser(user);
		} catch (e: any) {
			errorController.setError(e);
		}
	}

	async logout() {
		try {
			await this.api.logout();

			deleteCurrentUser();

			router.go(Paths.login);
		} catch (e: any) {
			errorController.setError(e);
		}
	}
}

export default new AuthController();
