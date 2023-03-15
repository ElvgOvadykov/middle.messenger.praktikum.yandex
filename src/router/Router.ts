import { BlockConstructor } from "@utils/Block";

import isUserAuthorized from "@utils/isUserAuthorized";

import Route from "./Route";

import { Paths } from "./enums";

class Router {
	private _routes: Array<Route>;

	private _history: History;

	private _currentRoute?: Route;

	private _rootQuery: string;

	constructor() {
		this._currentRoute = undefined;
		this._routes = [];
		this._history = window.history;
		this._rootQuery = "";
	}

	setRootQuery(rootQuery: string) {
		this._rootQuery = rootQuery;
		return this;
	}

	use(pathname: string, blockConstructor: BlockConstructor, isPrivateRoute = false) {
		const route = new Route(
			pathname,
			blockConstructor,
			{
				rootQuery: this._rootQuery,
			},
			isPrivateRoute,
		);
		this._routes.push(route);
		return this;
	}

	start() {
		window.addEventListener("popstate", (event: PopStateEvent) => {
			const { currentTarget } = event;

			this._onRoute((currentTarget as Window).location.pathname);
		});

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string) {
		const route = this.getRoute(pathname);

		if (!route) {
			const notFoundPage = this.getRoute("*");

			if (notFoundPage) {
				notFoundPage.render();
			}
			return;
		}

		if (route.isPrivateRoute) {
			if (!isUserAuthorized()) {
				this.go(Paths.login);
				return;
			}
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

export default new Router();
