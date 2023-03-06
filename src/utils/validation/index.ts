export default function getErrors(
	data: Record<string, string>,
	validationSchema: TValidationsSchema,
): Record<string, string> {
	return Object.entries(data).reduce((acc, [key, value]) => {
		if (validationSchema[key]) {
			return Object.assign(acc, validationSchema[key](value, key));
		}

		return acc;
	}, {});
}
