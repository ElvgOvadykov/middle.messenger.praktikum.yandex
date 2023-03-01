import { loginValidation, passwordValidation } from "./validations";

export const loginPageValidationSchema: TValidationsSchema = {
  login: loginValidation,
  password: passwordValidation,
};
