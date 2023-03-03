import {
	requeredError,
	loginError,
	nameError,
	passwordError,
	emailError,
	phoneError,
} from "./errorsText";

export function nameValidation(
	value: string,
	fieldName: string
): TValidationResult {
	if (value.length === 0) {
		return { [fieldName]: requeredError };
	}

	return /^[A-ZА-Я][A-ZА-Яa-zа-я-]+$/.test(value)
		? { [fieldName]: "" }
		: { [fieldName]: nameError };
}

export function loginValidation(
	value: string,
	fieldName: string
): TValidationResult {
	if (value.length === 0) {
		return { [fieldName]: requeredError };
	}

	return /^(?=.*[A-z])[A-z0-9-_]{3,20}$/.test(value)
		? { [fieldName]: "" }
		: { [fieldName]: loginError };
}

export function passwordValidation(
	value: string,
	fieldName: string
): TValidationResult {
	if (value.length === 0) {
		return { fieldName: requeredError };
	}

	return /^(?=.*[A-Z])(?=.*[0-9])[A-z0-9!@#$%^&*]{8,40}$/.test(value)
		? { [fieldName]: "" }
		: { [fieldName]: passwordError };
}

export function emailValidation(
	value: string,
	fieldName: string
): TValidationResult {
	if (value.length === 0) {
		return { [fieldName]: requeredError };
	}

	return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
		? { [fieldName]: "" }
		: { [fieldName]: emailError };
}

export function phoneValidation(
	value: string,
	fieldName: string
): TValidationResult {
	if (value.length === 0) {
		return { [fieldName]: requeredError };
	}

	return /^[+]*[0-9\-\+]{10,15}$/.test(value)
		? { [fieldName]: "" }
		: { [fieldName]: phoneError };
}

export function messageValidation(
	value: string,
	fieldName: string
): TValidationResult {
	if (value.length === 0) {
		return { [fieldName]: requeredError };
	}

	return { [fieldName]: "" };
}
