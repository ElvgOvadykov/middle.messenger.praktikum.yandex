declare module "uuid";

type TValidationResult = { [key: string]: string };

type TValidationFunction = (
	value: string,
	fieldName: string
) => TValidationResult;

type TValidationsSchema = Record<string, TValidationFunction>;
