import HTTPTransport from "@utils/HTTPTransport";

export default abstract class BaseAPI {
	protected http: HTTPTransport;

	constructor(rootUrl: string) {
		this.http = new HTTPTransport(rootUrl);
	}
}
