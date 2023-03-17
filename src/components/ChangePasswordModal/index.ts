import Block from "@utils/Block";
import Input from "@components/Input";
import Button from "@components/Button";

import userController from "@controllers/UserController";

import { passwordValidation } from "@utils/validation/validations";
import getErrors from "@utils/validation";
import { changePasswordModalValidationSchema } from "@utils/validation/validationSchems";

import template from "./index.hbs";

interface IChangePasswordModalProps {
	onCloseModal: () => void;
	events?: Record<string, EventListener>;
}

type TChangePasswordModalExtendedProps = IChangePasswordModalProps & {
	errors: {
		[key: string]: string;
	};
};

export default class ChangePasswordModal extends Block<TChangePasswordModalExtendedProps> {
	constructor(props: IChangePasswordModalProps) {
		const extendedProps: TChangePasswordModalExtendedProps = {
			...props,
			errors: {},
		};

		super(extendedProps);
	}

	protected init() {
		this.childrens.oldPassword = new Input({
			name: "oldPassword",
			lableTitle: "Прежний пароль",
			type: "password",
			events: {
				blur: this.getCheckInputValidationFunction(passwordValidation),
			},
		});

		this.childrens.newPassword = new Input({
			name: "newPassword",
			lableTitle: "Новый пароль",
			type: "password",
			events: {
				blur: this.getCheckInputValidationFunction(passwordValidation),
			},
		});

		this.childrens.savePasswordButton = new Button({
			type: "submit",
			contentValue: "Изменить пароль",
			events: {
				click: (event: Event) => {
					event.preventDefault();
					this.submitHandler();
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
		const errors = getErrors(data, changePasswordModalValidationSchema);
		this.updateInputErrorsMessage(data, errors);

		const hasErrors = Object.values(errors).some((error) => error.length);

		if (!hasErrors) {
			userController.changeUserPassword(data as UserAPINamespace.changeUserPassword.TRequest);
		}
	}

	protected render(): DocumentFragment {
		return this.compile(template, this.props);
	}
}
