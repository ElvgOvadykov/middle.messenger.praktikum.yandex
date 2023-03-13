type TAPIError = {
	reason: string;
};

type TUser = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	avatar: string;
	email: string;
};

type TLastMessage = {
	user: TUser;
	time: string;
	content: string;
};

type TChat = {
	id: number;
	title: string;
	avatar: string;
	unread_count: number;
	last_message: TLastMessage;
};
