import LoginPage from "@pages/Login";
import SignUpPage from "@pages/SignUp";

export const ROUTES = {
  login: LoginPage,
  signUp: SignUpPage,
};

export default function renderDOM(route: keyof typeof ROUTES) {
  const root = document.querySelector("#app");

  const PageComponent = ROUTES[route];
  
  const page = new PageComponent({});

  root!.innerHTML = "";

  root!.appendChild(page.element!);

  page.dispatchComponentDidMount();
}
