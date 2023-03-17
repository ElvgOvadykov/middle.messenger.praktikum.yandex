import API, { AuthAPI } from "@utils/API/authAPI";
import router, { Paths } from "@router/index";
import store from "@store/index";

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
			console.error(e);
		}
	}

	async signUp(payload: AuthAPINamespace.signUp.TRequest) {
		try {
			await this.api.signUp(payload);

			await this.getUser();

			router.go(Paths.chats);
		} catch (e: any) {
			console.error(e.message);
		}
	}

	async getUser() {
		try {
			const user = await this.api.getUser();

			console.log("getUser", user);

			store.set("currentUser.data", user);
		} catch (e) {
			console.log(e);
		}
	}

	async logout() {
		try {
			await this.api.logout();

			store.set("currentUser.data", undefined);

			router.go(Paths.login);
		} catch (e: any) {
			console.error(e.message);
		}
	}
}

export default new AuthController();
