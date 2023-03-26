import Block, { BlockConstructor } from "@utils/Block";

const isEqual = (lhs: string, rhs: string) => lhs === rhs;

const render = (component: Block) => {
	const root = document.querySelector("#app") as HTMLElement;

	root.innerHTML = "";

	root.appendChild(component.getContent()!);

	component.dispatchComponentDidMount();

	return root;
};

export interface IRoute {
	navigate(pathname: string): void;
	leave(): void;
	match(pathname: string): void;
	render(): void;
}

class Route {
	private _pathname: string;

	private _blockClass: BlockConstructor;

	private _block: any;

	private _props: Record<string, any>;

	private _isPrivateRoute: boolean;

	constructor(
		pathname: string,
		blockConstructor: BlockConstructor,
		props: Record<string, any>,
		isPrivateRoute: boolean,
	) {
		this._pathname = pathname;
		this._blockClass = blockConstructor;
		this._block = null;
		this._props = props;
		this._isPrivateRoute = isPrivateRoute;
	}

	get isPrivateRoute() {
		return this._isPrivateRoute;
	}

	navigate(pathname: string) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave() {
		if (this._block) {
			this._block.hide();
		}
	}

	match(pathname: string) {
		return isEqual(pathname, this._pathname);
	}

	render() {
		if (!this._block) {
			this._block = new this._blockClass(this._props);
		}

		render(this._block);
		this._block.show();
	}
}

export default Route;
