declare namespace UserAPINamespace {
	namespace changeUserProfile {
		type TRequest = {
			first_name: string;
			second_name: string;
			display_name: string;
			login: string;
			email: string;
			phone: string;
		};

		type TResponse = TUser;
	}

	namespace changeUserAvatar {
		type TRequest = FormData;

		type TResponse = TUser;
	}

	namespace changeUserPassword {
		type TRequest = {
			oldPassword: string;
			newPassword: string;
		};
	}

	namespace getUserById {
		type TRequest = {
			id: number;
		};

		type TResponse = TUser;
	}

	namespace getUserByLogin {
		type TRequest = {
			login: string;
		};

		type TResponse = TUser;
	}
}
