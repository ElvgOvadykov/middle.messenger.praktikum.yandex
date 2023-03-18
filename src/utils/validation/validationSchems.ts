import {
	loginValidation,
	passwordValidation,
	emailValidation,
	phoneValidation,
	nameValidation,
} from "./validations";

export const loginPageValidationSchema: TValidationsSchema = {
	login: loginValidation,
	password: passwordValidation,
};

export const profilePageValidationSchema: TValidationsSchema = {
	login: loginValidation,
	email: emailValidation,
	first_name: nameValidation,
	second_name: nameValidation,
	display_name: nameValidation,
	phone: phoneValidation,
};

export const changePasswordModalValidationSchema: TValidationsSchema = {
	oldPassword: passwordValidation,
	newPassword: passwordValidation,
};

export const signUpPageValidationSchema: TValidationsSchema = {
	login: loginValidation,
	email: emailValidation,
	first_name: nameValidation,
	second_name: nameValidation,
	phone: phoneValidation,
	password: passwordValidation,
};
