import Block from "@utils/Block";
import template from "./link.hbs";

interface LinkProps {
  linkHref: string;
  linkTitle: string;
}

export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
