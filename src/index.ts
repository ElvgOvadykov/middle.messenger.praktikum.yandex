import LoginPage from "@pages/Login";
import SignUpPage from "@pages/SignUp";
import ProfilePage from "@pages/Profile";
import ChatsPage from "@pages/Chats";
import NotFoundErrorPage from "@pages/404";

import router from "@utils/routes/Router";

window.addEventListener("DOMContentLoaded", () => {
	router
		.setRootQuery("#app")
		.use("*", NotFoundErrorPage)
		.use("/", LoginPage)
		.use("/sign-up", SignUpPage)
		.use("/settings", ProfilePage)
		.use("/messenger", ChatsPage)
		.start();
});
