import { BlockConstructor } from "@utils/Block";
import Route from "./Route";

import { Paths } from "./enums";

class Router {
	// eslint-disable-next-line no-use-before-define
	static __instance: Router;

	private _routes: Array<Route> = [];

	private _history: History = window.history;

	private _currentRoute?: Route;

	private _rootQuery = "";

	constructor(rootQuery?: string) {
		if (Router.__instance) {
			// eslint-disable-next-line no-constructor-return
			return Router.__instance;
		}

		this._currentRoute = undefined;
		this._rootQuery = rootQuery || "";

		Router.__instance = this;
	}

	use(pathname: string, blockConstructor: BlockConstructor) {
		const route = new Route(pathname, blockConstructor, { rootQuery: this._rootQuery });
		this._routes.push(route);
		return this;
	}

	start() {
		window.addEventListener("popstate", (event: PopStateEvent) => {
			console.log(event);

			const { currentTarget } = event;

			console.log((currentTarget as Window).location);

			this._onRoute((currentTarget as Window).location.pathname);
		});

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string) {
		const route = this.getRoute(pathname);

		if (!route) {
			return;
		}

		if (this._currentRoute) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render();
	}

	go(pathname: Paths) {
		this._history.pushState({}, "", pathname);
		this._onRoute(pathname);
	}

	back() {
		this._history.back();
	}

	forward() {
		this._history.forward();
	}

	getRoute(pathname: string) {
		return this._routes.find((route) => route.match(pathname));
	}
}

export default new Router("#app");
