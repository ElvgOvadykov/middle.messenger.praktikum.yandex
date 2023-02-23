import LoginPage from "@pages/Login";
import SignUpPage from "@pages/SignUp";
import NotFoundErrorPage from "@pages/404";
import ServerErrorPage from "@pages/500";
import HomePage from "@pages/home";

export const ROUTES = {
  login: LoginPage,
  signUp: SignUpPage,
  notFound: NotFoundErrorPage,
  serverError: ServerErrorPage,
  home: HomePage,
};

export default function renderDOM(route: keyof typeof ROUTES) {
  const root = document.querySelector("#app");

  const PageComponent = ROUTES[route];
  
  const page = new PageComponent({});

  root!.innerHTML = "";

  root!.appendChild(page.element!);

  page.dispatchComponentDidMount();
}
