type TValidationsSchema = Record<
  string,
  (value: string) => {} | { [key: string]: string }
>;
