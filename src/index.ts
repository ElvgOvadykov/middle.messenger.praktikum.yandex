import LoginPage from "@pages/Login";
import SignUpPage from "@pages/SignUp";
import ProfilePage from "@pages/Profile";
import ChatsPage from "@pages/Chats";

import router from "@utils/routes/Router";

window.addEventListener("DOMContentLoaded", () => {
	router
		.use("/", LoginPage)
		.use("/sign-up", SignUpPage)
		.use("/settings", ProfilePage)
		.use("/messenger", ChatsPage)
		.start();
});
