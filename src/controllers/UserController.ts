import API, { UserAPI } from "@utils/API/userAPI";
import router, { Paths } from "@router/index";
import store from "@store/index";

export class UserController {
	private readonly api: UserAPI;

	constructor() {
		this.api = API;
	}

	async changeUserProfile(payload: UserAPINamespace.changeUserProfile.TRequest) {
		try {
			const newUserData = await this.api.changeUserProfile(payload);

			store.set("currentUser.data", newUserData);
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
		} catch (e) {
			console.log(e);
		}
	}
}

export default new UserController();
