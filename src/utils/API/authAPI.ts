import HTTPTransport from "@utils/HTTPTransport";

const httpTransport = new HTTPTransport("/auth");

class AuthAPI {
	signUp(payload: AuthAPINamespace.signUp.TRequest) {
		return httpTransport.post("/signup", {
			data: payload,
		}) as Promise<AuthAPINamespace.signUp.TResponse>;
	}

	signIn(payload: AuthAPINamespace.signIn.TRequest) {
		return httpTransport.post("/signin", {
			data: payload,
		});
	}

	getUser() {
		return httpTransport.get(
			"/user",
			{},
		) as Promise<AuthAPINamespace.getUser.TResponse>;
	}

	logout() {
		return httpTransport.post("/logout", {});
	}
}

export default new AuthAPI();
