import {
  requeredError,
  loginError,
  firstNameError,
  passwordError,
  secondNameError,
  emailError,
  phoneError,
} from "./errorsText";

export function firstNameValidation(
  first_name: string
): { first_name: string } | {} {
  if (first_name.length === 0) {
    return { first_name: requeredError };
  }

  return /^[A-ZА-Я][A-ZА-Яa-zа-я-]+$/.test(first_name)
    ? {}
    : { first_name: firstNameError };
}

export function secondNameValidation(
  second_name: string
): { second_name: string } | {} {
  if (second_name.length === 0) {
    return { second_name: requeredError };
  }

  return /^[A-ZА-Я][A-ZА-Яa-zа-я-]+$/.test(second_name)
    ? {}
    : { second_name: secondNameError };
}

export function loginValidation(login: string): { login: string } | {} {
  if (login.length === 0) {
    return { login: requeredError };
  }

  return /^(?=.*[A-z])[A-z0-9-_]{3,20}$/.test(login)
    ? {}
    : { login: loginError };
}

export function passwordValidation(
  password: string
): { password: string } | {} {
  if (password.length === 0) {
    return { password: requeredError };
  }

  return /^(?=.*[A-Z])(?=.*[0-9])[A-z0-9!@#$%^&*]{8,40}$/.test(password)
    ? {}
    : { password: passwordError };
}

export function email(email: string): { email: string } | {} {
  if (email.length === 0) {
    return { email: requeredError };
  }

  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    ? {}
    : { email: emailError };
}

export function phone(phone: string): { phone: string } | {} {
  if (phone.length === 0) {
    return { phone: requeredError };
  }

  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(phone)
    ? {}
    : { phone: phoneError };
}

export function message(message: string): { message: string } | {} {
  if (message.length === 0) {
    return { message: requeredError };
  }

  return {};
}
