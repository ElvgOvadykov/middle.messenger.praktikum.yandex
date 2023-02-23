import Block from "@utils/Block";
import template from "./button.hbs";

interface ButtonProps {
  type: string;
  contentValue: string;
  events?: Record<string, Function>
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
