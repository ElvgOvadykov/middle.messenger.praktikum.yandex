// eslint-disable-next-line import/prefer-default-export
export const deepEqual = (a: any, b: any) => {
	if (a === b) {
		return true;
	}
	if (a === null || b === null || typeof a !== "object" || typeof b !== "object") {
		return false;
	}
	const aKeys = Object.keys(a);
	const bKeys = Object.keys(b);
	if (aKeys.length !== bKeys.length) {
		return false;
	}
	for (let i = 0; i < aKeys.length; i += 1) {
		const key = aKeys[i];
		if (!bKeys.includes(key) || !deepEqual(a[key], b[key])) {
			return false;
		}
	}
	return true;
};

export type Indexed<T = any> = {
	[key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
	for (const p in rhs) {
		if (!rhs.hasOwnProperty(p)) {
			continue;
		}

		try {
			if (rhs[p].constructor === Object) {
				lhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
			} else if (rhs[p].constructor === Array) {
				lhs[p] = Array.from(rhs[p] as Array<any>);
			} else {
				lhs[p] = rhs[p];
			}
		} catch (e) {
			lhs[p] = rhs[p];
		}
	}

	return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
	if (typeof object !== "object" || object === null) {
		return object;
	}

	if (typeof path !== "string") {
		throw new Error("path must be string");
	}

	const result = path.split(".").reduceRight<Indexed>(
		(acc, key) => ({
			[key]: acc,
		}),
		value as any,
	);

	return merge(object as Indexed, result);
}

function isPlainObject(value: unknown): value is Indexed {
	return (
		typeof value === "object" &&
		value !== null &&
		value.constructor === Object &&
		Object.prototype.toString.call(value) === "[object Object]"
	);
}

function isArray(value: unknown): value is [] {
	return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | Indexed {
	return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: Indexed, rhs: Indexed) {
	if (Object.keys(lhs).length !== Object.keys(rhs).length) {
		return false;
	}

	for (const [key, value] of Object.entries(lhs)) {
		const rightValue = rhs[key];
		if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
			if (isEqual(value, rightValue)) {
				continue;
			}
			return false;
		}

		if (value !== rightValue) {
			return false;
		}
	}

	return true;
}

export function getCurrentPathToImg(avatarValue: string) {
	if (!avatarValue) {
		return "";
	}

	return `${String(process.env.API_URL)}/resources${avatarValue}`;
}
