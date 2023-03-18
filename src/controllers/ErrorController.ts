import store from "@store/Store";
import router, { Paths } from "@router/index";

export class ErrorController {
	setError(error: TAPIError) {
		if (!error) {
			store.set("responseError", { reason: "Неизвестная ошибка" });
			return;
		}

		switch (error.reason) {
			case "Cookie is not valid":
				router.go(Paths.login);
				break;

			default:
				store.set("responseError", error);
		}
	}

	deleteError() {
		store.set("responseError", undefined);
	}
}

export default new ErrorController();
