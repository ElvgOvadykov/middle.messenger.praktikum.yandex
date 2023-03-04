import Block from "@utils/Block";
import Input from "@components/Input";
import Button, { ButtonSize } from "@components/Button";
import ChangePasswordModal from "@components/ChangePasswordModal";
import UploadAvatarModal from "@components/UploadAvatarModal";

import renderDOM from "@utils/renderDom";
import { profilePageValidationSchema } from "@utils/validation/validationSchems";
import {
	loginValidation,
	emailValidation,
	nameValidation,
	phoneValidation,
} from "@utils/validation/validations";
import getErrors from "@utils/validation";

import template from "./profile.hbs";

import "./style.scss";

interface IProfilePageProps {
	isChangePasswordModalVisible: boolean;
	isUploadAvatarModalVisible: boolean;
	errors: {
		[key: string]: string;
	};
	events?: Record<string, EventListener>;
}

export default class ProfilePage extends Block<IProfilePageProps> {
	constructor() {
		const props: IProfilePageProps = {
			isChangePasswordModalVisible: false,
			isUploadAvatarModalVisible: false,
			errors: {},
		};

		super(props);
	}

	protected addEvents(): void {
		const avatarBlock = this.element?.querySelector(".profile-avatar-block");

		avatarBlock?.addEventListener("click", () => {
			this.setProps({ isUploadAvatarModalVisible: true });
		});
	}

	init() {
		this.childrens.buttonBack = new Button({
			contentValue: "Назад",
			type: "button",
			id: "buttonBack",
			size: ButtonSize.Medium,
			events: {
				click: () => {
					renderDOM("chats");
				},
			},
		});

		this.childrens.login = new Input({
			name: "login",
			lableTitle: "Логин",
			type: "text",
			events: {
				blur: this.getCheckInputValidationFunction(loginValidation),
			},
		});

		this.childrens.email = new Input({
			name: "email",
			lableTitle: "Почта",
			type: "text",
			events: {
				blur: this.getCheckInputValidationFunction(emailValidation),
			},
		});

		this.childrens.first_name = new Input({
			name: "first_name",
			lableTitle: "Имя",
			type: "text",
			events: {
				blur: this.getCheckInputValidationFunction(nameValidation),
			},
		});

		this.childrens.second_name = new Input({
			name: "second_name",
			lableTitle: "Фамилия",
			type: "text",
			events: {
				blur: this.getCheckInputValidationFunction(nameValidation),
			},
		});

		this.childrens.display_name = new Input({
			name: "display_name",
			lableTitle: "Имя в чате",
			type: "text",
			events: {
				blur: this.getCheckInputValidationFunction(nameValidation),
			},
		});

		this.childrens.phone = new Input({
			name: "phone",
			lableTitle: "Телефон",
			type: "tel",
			events: {
				blur: this.getCheckInputValidationFunction(phoneValidation),
			},
		});

		this.childrens.submitButton = new Button({
			type: "submit",
			contentValue: "Сохранить изменения",
			events: {
				click: (event: Event) => {
					event.preventDefault();
					this.submitHandler();
				},
			},
		});

		this.childrens.changePasswordModal = new ChangePasswordModal({
			onCloseModal: () => this.setProps({ isChangePasswordModalVisible: false }),
			events: {
				click: (event: Event) => {
					const { target } = event;

					if ((target as HTMLDivElement).matches("#changePasswordModal")) {
						this.setProps({ isChangePasswordModalVisible: false });
					}
				},
			},
		});

		this.childrens.uploadAvatarModal = new UploadAvatarModal({
			onCloseModal: () => this.setProps({ isUploadAvatarModalVisible: false }),
		});

		this.childrens.toggleChangePasswordModuleButton = new Button({
			type: "button",
			contentValue: "Изменить пароль",
			events: {
				click: () => {
					this.setProps({ isChangePasswordModalVisible: true });
				},
			},
		});
	}

	getCheckInputValidationFunction(validationFunction: TValidationFunction) {
		return (event: Event) => {
			const { target } = event;

			const name = (target as HTMLInputElement).getAttribute("name") ?? "";

			const error = validationFunction(
				(target as HTMLInputElement).value,
				name,
			);

			this.setProps({ errors: Object.assign(this.props.errors, error) });

			const input = this.childrens[name] as Input;

			input.setProps({ error: error[name] });
			input.setValue((target as HTMLInputElement).value);
		};
	}

	getInputsData(): Record<string, string> {
		return Object.values(this.childrens).reduce((acc, current) => {
			if (current instanceof Input) {
				return Object.assign(acc, { [current.name]: current.value });
			}

			return acc;
		}, {});
	}

	updateInputErrorsMessage(
		data: ReturnType<typeof this.getInputsData>,
		errors: ReturnType<typeof getErrors>,
	) {
		Object.keys(data).forEach((key) => {
			const input = this.childrens[key] as Input;

			if (errors[key]) {
				input.setProps({ error: errors[key] });
			} else {
				input.setProps({ error: undefined });
			}

			input.setValue(data[key]);
		});
	}

	submitHandler() {
		const data = this.getInputsData();
		const errors = getErrors(data, profilePageValidationSchema);
		this.updateInputErrorsMessage(data, errors);

		const hasErrors = Object.values(errors).some((error) => error.length);

		if (!hasErrors) {
			console.log(data);

			renderDOM("chats");
		}
	}

	render() {
		return this.compile(template, this.props);
	}
}
