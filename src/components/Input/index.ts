import Block from "@utils/Block";
import template from "./input.hbs";

interface InputProps {
  name: string;
  lableTitle: string;
  type: string;
  placeholder?: string;
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
