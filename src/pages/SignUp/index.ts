import Block from "@utils/Block";
import Input from "@components/Input";
import Link from "@components/Link";
import Button from "@components/Button";

import authController from "@controllers/AuthController";

import { signUpPageValidationSchema } from "@utils/validation/validationSchems";
import {
	loginValidation,
	passwordValidation,
	emailValidation,
	nameValidation,
	phoneValidation,
} from "@utils/validation/validations";
import getErrors from "@utils/validation";
import { Paths } from "@router/index";

import template from "./signUp.hbs";

import "./style.scss";

interface ISignUpPageProps {
	errors: { [key: string]: string };
}

export default class SignUpPage extends Block<ISignUpPageProps> {
	constructor() {
		const props: ISignUpPageProps = {
			errors: {},
		};

		super(props);
	}

	init() {
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

		this.childrens.password = new Input({
			name: "password",
			lableTitle: "Пароль",
			type: "password",
			events: {
				blur: this.getCheckInputValidationFunction(passwordValidation),
			},
		});

		this.childrens.buttonSubmit = new Button({
			type: "submit",
			contentValue: "Регистрация",
			events: {
				click: (event: Event) => {
					event.preventDefault();
					this.submitHandler();
				},
			},
		});

		this.childrens.linkToLogin = new Link({
			linkHref: Paths.login,
			linkTitle: "Уже есть профиль?",
		});
	}

	getCheckInputValidationFunction(validationFunction: TValidationFunction) {
		return (event: Event) => {
			const { target } = event;

			const name = (target as HTMLInputElement).getAttribute("name") ?? "";

			const error = validationFunction((target as HTMLInputElement).value, name);

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
		const errors = getErrors(data, signUpPageValidationSchema);
		this.updateInputErrorsMessage(data, errors);

		const hasErrors = Object.values(errors).some((error) => error.length);

		if (!hasErrors) {
			console.log(data);

			authController.signUp(data as AuthAPINamespace.signUp.TRequest);
		}
	}

	protected render() {
		return this.compile(template, this.props);
	}
}
