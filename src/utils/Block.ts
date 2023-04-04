// eslint-disable no-use-before-define
import { v4 as uuidv4 } from "uuid";
import EventBus from "./EventBus";

const enum BlockEvents {
	INIT = "init",
	FLOW_CDM = "flow:component-did-mount",
	FLOW_CDU = "flow:component-did-update",
	FLOW_RENDER = "flow:render",
}

export interface BlockConstructor {
	// eslint-disable-next-line no-use-before-define
	new (props?: Record<string, any>): Block;
}

abstract class Block<TProps extends Record<string, any> = any> {
	private _element: HTMLElement | undefined = undefined;

	protected props: TProps;

	// eslint-disable-next-line no-use-before-define
	childrens: Record<string, Block | Block[]>;

	private eventBus: () => EventBus;

	id = uuidv4();

	constructor(propsWithChildrens: TProps) {
		const eventBus = new EventBus();

		const { props, childrens } = this._getChildrenAndProps(propsWithChildrens);

		this.childrens = childrens;
		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);
		this.eventBus().emit(BlockEvents.INIT);
	}

	protected addEvents() {
		const { events = {} } = this.props as TProps & {
			events: Record<string, () => void>;
		};

		Object.keys(events).forEach((eventName) => {
			this._element?.addEventListener(eventName, events[eventName]);
		});
	}

	protected removeEvents() {
		const { events = {} } = this.props as TProps & {
			events: Record<string, () => void>;
		};

		if (!events) {
			return;
		}

		Object.entries(events).forEach(([event, listener]) => {
			this._element?.removeEventListener(event, listener);
		});
	}

	private _getChildrenAndProps(childrensAndProps: TProps): {
		props: TProps;
		childrens: Record<string, Block | Block[]>;
	} {
		const props: Record<string, unknown> = {};
		const childrens: Record<string, Block | Block[]> = {};

		Object.entries(childrensAndProps).forEach(([key, value]) => {
			if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
				childrens[key as string] = value;
			} else if (value instanceof Block) {
				childrens[key as string] = value;
			} else {
				props[key] = value;
			}
		});

		return { props: props as TProps, childrens };
	}

	private _registerEvents(eventBus: EventBus) {
		eventBus.on(BlockEvents.INIT, this._init.bind(this));
		eventBus.on(BlockEvents.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(BlockEvents.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(BlockEvents.FLOW_RENDER, this._render.bind(this));
	}

	private _init() {
		this.init();

		this.eventBus().emit(BlockEvents.FLOW_RENDER);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected init() {}

	private _componentDidMount() {
		this.componentDidMount();
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	componentDidMount() {}

	dispatchComponentDidMount() {
		this.eventBus().emit(BlockEvents.FLOW_CDM);

		Object.values(this.childrens).forEach((children) => {
			if (Array.isArray(children)) {
				children.forEach((item) => item.dispatchComponentDidMount());
			} else {
				children.dispatchComponentDidMount();
			}
		});
	}

	private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}
		this.eventBus().emit(BlockEvents.FLOW_RENDER);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	componentDidUpdate(oldProps: TProps, newProps: TProps) {
		return true;
	}

	setProps = (nextProps: Partial<TProps>) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element() {
		return this._element;
	}

	protected compile(template: (context: any) => string, context: any) {
		function getClasses(classes: Array<string>) {
			return classes.join(" ");
		}

		const contextAndStubs = {
			...context,
			classes: this.props.classes ? getClasses(this.props.classes) : "",
		};

		Object.entries(this.childrens).forEach(([name, component]) => {
			if (Array.isArray(component)) {
				contextAndStubs[name] = component.reduce(
					(acc, child) => acc.concat(`<div data-id="${child.id}"></div>`),
					"",
				);
			} else {
				contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
			}
		});

		const html = template(contextAndStubs);

		const temp = document.createElement("template");

		temp.innerHTML = html;

		function replaceStub(component: Block) {
			const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

			if (!stub) {
				return;
			}

			component.getContent()?.append(...Array.from(stub.childNodes));

			stub.replaceWith(component.getContent()!);
		}

		Object.entries(this.childrens).forEach(([, component]) => {
			if (Array.isArray(component)) {
				component.forEach(replaceStub);
			} else {
				replaceStub(component);
			}
		});

		return temp.content;
	}

	private _render() {
		const fragment = this.render();

		this.removeEvents();
		const newElement = fragment.firstElementChild as HTMLElement;

		if (this._element && newElement) {
			this._element.replaceWith(newElement);
		}

		this._element = newElement;

		this.addEvents();
	}

	protected render(): DocumentFragment {
		return new DocumentFragment();
	}

	getContent() {
		return this.element;
	}

	private _makePropsProxy(props: TProps) {
		return new Proxy(props, {
			get: (target, prop) => {
				const value = target[prop as string];
				return typeof value === "function" ? value.bind(target) : value;
			},
			set: (target, prop, value) => {
				// eslint-disable-next-line no-param-reassign
				target[prop as keyof TProps] = value;

				this.eventBus().emit(BlockEvents.FLOW_CDU, { ...target }, target);
				return true;
			},
			deleteProperty() {
				throw new Error("Нет доступа");
			},
		});
	}

	show() {
		const content = this.getContent();

		if (content) {
			content.style.display = "block";
		}
	}

	hide() {
		const content = this.getContent();

		if (content) {
			content.style.display = "none";
		}
	}
}

export default Block;
