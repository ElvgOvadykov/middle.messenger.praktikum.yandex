import Block from "@utils/Block";
import template from "./button.hbs";

import "./style.scss";

export enum ButtonSize {
  FullWith = "button__size-full-width",
  Medium = "button__size-medium-width",
  Small = "button__size-small-width",
}

export enum ButtonColor {
  Green = "button__color-green",
  White = "button__color-white",
}

interface IButtonProps {
  type: string;
  contentValue: string;
  size?: ButtonSize;
  color?: ButtonColor;
  events?: Record<string, (event: Event) => void>;
  id?: string;
}

type TButtonExtendedProps = IButtonProps & {
  classes: Array<string>;
};

export default class Button extends Block<TButtonExtendedProps> {
  constructor(props: IButtonProps) {
    const extendedProps: TButtonExtendedProps = {
      ...props,
      classes: [""],
    };

    extendedProps.classes.push(props.size ?? ButtonSize.FullWith);
    extendedProps.classes.push(props.color ?? ButtonColor.Green);

    super(extendedProps);
  }

  protected render(): DocumentFragment {
    console.log("button render");
    return this.compile(template, this.props);
  }
}
