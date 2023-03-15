import Block, { BlockConstructor } from "@utils/Block";

import renderDom from "@utils/renderDom";

export default class Route {
	private _pathname: string;

	private _blockClass: BlockConstructor;

	private _block?: Block;

	private _props: Record<string, any>;

	constructor(
		pathname: string,
		view: BlockConstructor,
		props: Record<string, any>,
	) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = undefined;
		this._props = props;
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
		return pathname === this._pathname;
	}

	render() {
		this._block = new this._blockClass({});
		renderDom(this._props.rootQuery, this._block);
	}
}
