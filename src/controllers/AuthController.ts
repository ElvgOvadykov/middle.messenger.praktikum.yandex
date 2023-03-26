import API, { AuthAPI } from "@utils/API/authAPI";
import { setCurrentUser, deleteCurrentUser } from "@utils/userHelpers";
import router, { Paths } from "@router/index";
import store from "@store/Store";

import errorController from "./ErrorController";
import messagesController from "./MessagesController";

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
			if (e.reason === "User already in system") {
				await this.getUser();
				router.go(Paths.chats);
				return;
			}

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
			store.set("currentUser", user);
		} catch (e: any) {
			errorController.setError(e);
		}
	}

	async logout() {
		try {
			await this.api.logout();
			deleteCurrentUser();
			store.set("currentUser", undefined);
			messagesController.closeAll();
			router.go(Paths.login);
		} catch (e: any) {
			errorController.setError(e);
		}
	}
}

export default new AuthController();
