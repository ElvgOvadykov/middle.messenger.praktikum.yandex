enum METHODS {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

type TOptions = {
	method?: METHODS;
	data?: Record<string, any>;
	timeout?: number;
	headers?: Record<string, string>;
};

type HTTPMethod = <Response>(url: string, options: TOptions) => Promise<Response>;

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data = {}) {
	// Можно делать трансформацию GET-параметров в отдельной функции
	return Object.entries(data).reduce((acc, [key, value], index, array) => {
		if (index === array.length - 1) {
			return acc.concat(`${key}=${value}`);
		}
		return acc.concat(`${key}=${value}&`);
	}, "?");
}

export default class HTTPTransport {
	protected baseUrl: string;

	constructor(rootUrl: string) {
		const { API_URL } = process.env;

		this.baseUrl = `${API_URL}${rootUrl}`;
	}

	get: HTTPMethod = (url, options) => {
		let currentUrl = url;

		if (options.data) {
			currentUrl = url.concat(queryStringify(options.data));
		}

		return this.request(currentUrl, { ...options, method: METHODS.GET }, options.timeout);
	};

	put: HTTPMethod = (url, options) =>
		this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

	post: HTTPMethod = (url, options) =>
		this.request(url, { ...options, method: METHODS.POST }, options.timeout);

	delete: HTTPMethod = (url, options) =>
		this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

	request = <Response>(url: string, options: TOptions, timeout = 5000): Promise<Response> => {
		const { method, data, headers } = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method!, this.baseUrl + url);

			if (headers) {
				Object.entries(headers).forEach(([key, value]) => {
					xhr.setRequestHeader(key, value);
				});
			}

			xhr.timeout = timeout;
			xhr.withCredentials = true;
			xhr.responseType = "json";

			xhr.onreadystatechange = () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status < 400) {
						resolve(xhr.response);
					} else {
						reject(xhr.response);
					}
				}
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else if (data instanceof FormData) {
				xhr.send(data);
			}	else {
				xhr.send(JSON.stringify(data));
			}
		});
	};
}
