import LoginPage from "@pages/Login";
import SignUpPage from "@pages/SignUp";
import ProfilePage from "@pages/Profile";
import ChatsPage from "@pages/Chats";
import NotFoundErrorPage from "@pages/404";

import router from "@router/index";

window.addEventListener("DOMContentLoaded", async () => {
	router
		.setRootQuery("#app")
		.use("*", NotFoundErrorPage)
		.use("/", LoginPage)
		.use("/sign-up", SignUpPage)
		.use("/settings", ProfilePage, true)
		.use("/messenger", ChatsPage, true)
		.start();
});
