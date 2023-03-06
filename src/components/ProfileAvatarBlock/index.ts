import Block from "@utils/Block";

import template from "./profileAvatarBlock.hbs";

import "./style.scss";

interface IProfileAvatarBlockProps {
	events?: Record<string, () => void>;
}

export default class ProfileAvatarBlock extends Block<IProfileAvatarBlockProps> {
	constructor(props: IProfileAvatarBlockProps) {
		super(props);
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}
