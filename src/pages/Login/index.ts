import Block from "@utils/Block";
import Button from "@components/Button";
import Input from "@components/Input";
import Link from "@components/Link";
import ErrorMessage from "@components/ErrorMessage";

import authController from "@controllers/AuthController";

import { loginPageValidationSchema } from "@utils/validation/validationSchems";
import {
	loginValidation,
	passwordValidation,
} from "@utils/validation/validations";
import getErrors from "@utils/validation";
import { isUserAuthorized } from "@utils/userHelpers";
import router, { Paths } from "@router/index";

import template from "./login.hbs";

import "./style.scss";

interface ILoginPageProps {
	errors: { [key: string]: string };
}

export default class LoginPage extends Block<ILoginPageProps> {
	constructor() {
		const props: ILoginPageProps = {
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
			contentValue: "Вход",
			events: {
				click: (event: Event) => {
					event.preventDefault();
					this.submitHandler();
				},
			},
		});

		this.childrens.linkToSignUp = new Link({
			linkHref: Paths.signUp,
			linkTitle: "Регистрация",
		});

		this.childrens.errorMessage = new ErrorMessage();
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
		const errors = getErrors(data, loginPageValidationSchema);
		this.updateInputErrorsMessage(data, errors);

		const hasErrors = Object.values(errors).some((error) => error.length);

		if (!hasErrors) {
			authController
				.signIn(data as AuthAPINamespace.signIn.TRequest)
				.then(() => {
					if (isUserAuthorized()) {
						router.go(Paths.chats);
					}
				});
		}
	}

	componentDidMount(): void {
		if (isUserAuthorized()) {
			router.go(Paths.chats);
		}
	}

	protected render() {
		return this.compile(template, this.props);
	}
}
