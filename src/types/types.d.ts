type TValidationsSchema = Record<string, TValidationFunction>;

type TValidationFunction = (
  value: string,
  fieldName: string
) => TValidationResult;

type TValidationResult = { [key: string]: string };
