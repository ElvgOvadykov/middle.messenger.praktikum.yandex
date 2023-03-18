import store from "@store/Store";
import router, { Paths } from "@router/index";

export class ErrorController {
	setError(error: TAPIError) {
		switch (error.reason) {
			case "Cookie is not valid":
				router.go(Paths.login);
				break;

			default:
				store.set("responseError", error);
		}

		console.log(store.getState());
	}

	deleteError() {
		store.set("responseError", undefined);
	}
}

export default new ErrorController();
