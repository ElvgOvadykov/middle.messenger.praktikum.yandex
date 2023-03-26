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

type TMessage = {
	chat_id: number;
	time: string;
	type: string;
	user_id: number;
	content: string;
	file?: {
		id: number;
		user_id: number;
		path: string;
		filename: string;
		content_type: string;
		content_size: number;
		upload_date: string;
	};
};
