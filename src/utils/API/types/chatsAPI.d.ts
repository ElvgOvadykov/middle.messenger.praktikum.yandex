declare namespace ChatsAPINamespace {
	namespace getChats {
		type TRequestParametrs = {
			offset: number;

			limit: number;

			title: string;
		};

		type TRequest = Partial<TRequestParametrs>;

		type TResponse = Array<TChat>;
	}

	namespace createChat {
		type TRequest = {
			title: string;
		};
	}

	namespace deleteChat {
		type TRequest = {
			chatId: number;
		};

		type TResponse = {
			userId: number;

			result: TChat;
		};
	}

	namespace addUsersToChat {
		type TRequest = {
			users: Array<number>;
			chatId: number;
		};
	}

	namespace deleteUsersFromChat {
		type TRequest = {
			users: Array<number>;
			chatId: number;
		};
	}
}