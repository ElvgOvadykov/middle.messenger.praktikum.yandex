import EventBus from "./EventBus";
import { v4 as uuidv4 } from "uuid";

const enum BlockEvents {
  INIT = "init",
  FLOW_CDM = "flow:component-did-mount",
  FLOW_CDU = "flow:component-did-update",
  FLOW_RENDER = "flow:render",
}

abstract class Block<TProps extends Record<string, any> = any> {
  private _element: HTMLElement | undefined = undefined;
  protected props: TProps;
  childrens: Record<string, Block | Block[]>;
  private eventBus: () => EventBus;
  id = uuidv4();

  constructor(propsWithChildrens: TProps) {
    const eventBus = new EventBus();

    const {props, childrens} = this._getChildrenAndProps(propsWithChildrens);

    this.childrens = childrens;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    this.eventBus().emit(BlockEvents.INIT);
  }

  private _addEvents() {
    const {events = {}} = this.props as TProps & { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _getChildrenAndProps(childrensAndProps: TProps): { props: TProps, childrens: Record<string, Block | Block[]> } {
    const props: Record<string, unknown> = {};
    const childrens: Record<string, Block | Block[]> = {};

    Object.entries(childrensAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0 && value.every(v => v instanceof Block)) {
        childrens[key as string] = value;
      } else if (value instanceof Block) {
        childrens[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return {props: props as TProps, childrens};
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

  protected init() {
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(BlockEvents.FLOW_CDM);

    Object.values(this.childrens).forEach(children => {
      if (Array.isArray(children)) {
        children.forEach(item => item.dispatchComponentDidMount());
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
    function replaceStub(component: Block) {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    }

    const contextAndStubs = {...context};

    Object.entries(this.childrens).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map(child => `<div data-id="${child.id}"></div>`)
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    Object.entries(this.childrens).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return temp.content;
  }

  _render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  private _makePropsProxy(props: TProps) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as string];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop as keyof TProps] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(BlockEvents.FLOW_CDU, { ...target }, target);
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