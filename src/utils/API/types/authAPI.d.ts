declare namespace AuthAPINamespace {
	namespace signUp {
		type TRequest = {
			first_name: string;
			second_name: string;
			login: string;
			email: string;
			password: string;
			phone: string;
		};

		type TResponse = {
			id: number;
		};
	}

	namespace signIn {
		type TRequest = {
			login: string;
			password: string;
		};
	}

	namespace getUser {
		type TResponse = TUser;
	}
}
